import React from "react";
import styles from "./store-products.module.css";

import EmptyStore from "./EmptyStore";

import StoreItem from "./StoreItem";

class StoreProducts extends React.Component {
  render() {
    let { products } = this.state;
    console.log(" StoreProducts STATE", products);

    return (
      <div className={styles.store}>
        {/* {products.length && (
          <h2
            className={styles.storeHeading}
          >{`${products.length} products listed`}</h2>
        )} */}

        <div className={styles.storeItems}>
          {products.map((product, index) => {
            return <StoreItem product={product} key={index} />;
          })}
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let products = [];

    this.state = { products };
  }

  componentDidMount() {
    let { store } = this.props;

    if (store.fields.Products) this.fetchAllProducts(store.fields.Products);
  }
  componentWillUnmount() {}

  fetchAllProducts = (products) => {
    return new Promise((resolve) => {
      const allProductPromises = products.map((product) =>
        this.fetchProduct(product)
      );

      Promise.all(allProductPromises)
        .then((productValues) => {
          this.setState(
            {
              products: productValues.filter(this.filterProducts),
            },
            () => {
              let { endLoading } = this.props;
              endLoading();
            }
          );
        })
        .catch((err) => {
          console.error("ALL PRODUCTS REJECT");
          let { endLoading } = this.props;
          endLoading();
          alert("Error Loading store products!");
        });
    });
  };

  filterProducts = (product) => {
    return product.fields.Status === "for-sale";
  };

  fetchProduct = (productId) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/airtable/getProduct?product=${productId}`)
        .then((response) => {
          console.log("product RESPONSE", response);
          return response.json();
        })
        .then((data) => {
          console.log("product DATA", data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject();
        });
    });
  };
}

export default StoreProducts;
