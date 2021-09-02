import React from "react";
import styles from "./store-products.module.css";
import EmptyStore from "./EmptyStore";
import StoreItem from "./StoreItem";
import { getSubDomainOfPage } from "../services/helper";

class StoreProducts extends React.Component {
  constructor(props) {
    super(props);

    let products = [];

    this.state = { products };
  }

  componentDidMount() {
    let { store } = this.props;
    const subdomain = getSubDomainOfPage();

    if (store.fields.hasOwnProperty("Products")) {
      this.fetchAllProducts(store.fields.Products, subdomain);
    } else {
      const { endLoading } = this.props;
      endLoading();
    }
  }
  componentWillUnmount() {}

  fetchAllProducts = (products, subdomain) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/airtable/getAllProducts?subdomain=${subdomain}`)
        .then((response) => {
          console.log("product RESPONSE", response);
          return response.json();
        })
        .then((productValues) => {
          this.setState(
            {
              products: productValues.records.filter(this.filterProducts),
            },
            () => {
              let { endLoading } = this.props;
              endLoading();
            }
          );
        })
        .catch((err) => {
          console.error(err);
          let { endLoading } = this.props;
          endLoading();
          alert("Error Loading store products!");
          reject();
        });
    });
  };

  filterProducts = (product) => {
    let { store } = this.props;
    return product.fields.Stores?.includes(store.id);
  };

  fetchProduct = (productId, subdomain) => {
    return new Promise((resolve, reject) => {
      fetch(
        `/api/airtable/getProduct?product=${productId}&subdomain=${subdomain}`
      )
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

  render() {
    let { products } = this.state;
    console.log(" StoreProducts STATE", products);

    let { loading } = this.props;

    console.log({ props: this.props, loading });
    return (
      <div className={styles.store}>
        {/* {products.length && (
          <h2
            className={styles.storeHeading}
          >{`${products.length} products listed`}</h2>
        )} */}

        {!loading && (
          <div className={styles.storeItems}>
            {products.length > 0 ? (
              products.map((product, index) => {
                return <StoreItem product={product} key={index} />;
              })
            ) : (
              <EmptyStore />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default StoreProducts;
