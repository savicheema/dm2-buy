import React from "react";
import styles from "./store-products.module.css";
import EmptyStore from "./EmptyStore";
import StoreItem from "./StoreItem";
import { getSubDomainOfPage } from "../services/helper";

import StoreCollections from "./StoreCollections";
import LoaderComponent from "./Loader";

class StoreProducts extends React.Component {
  constructor(props) {
    super(props);

    let products = [];
    let storeCollections = [];
    let collectionsHeight = 0;
    let selectedFilter = undefined;

    this.state = {
      products,
      storeCollections,
      selectedFilter,
      loading: true
    };

    this.collectionsRef = React.createRef();
  }

  componentDidMount() {
    let { store } = this.props;
    getSubDomainOfPage().then(subdomain => {
      if (store.hasOwnProperty("Products")) {
        this.fetchAllProducts(store.Products, subdomain);
      } else {
        const { endLoading } = this.props;
        endLoading();
      }
    });
  }
  componentWillUnmount() {}

  fetchAllProducts = (products, subdomain) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/contentful/getAllProducts?subdomain=${subdomain}`)
        .then((response) => {
          return response.json();
        })
        .then((productValues) => {
          console.log("product RESPONSE", productValues);
          this.setState(
            {
              // products: productValues.records.filter(this.filterStoreProducts),
              products: productValues.records,
            },
            () => {
              let { endLoading } = this.props;
              let { products } = this.state;

              products.forEach(this.getCollectionsOfProductAddToStore);

              endLoading();
              this.setState({loading: false});
            }
          );
        })
        .catch((err) => {
          console.error(err);
          let { endLoading } = this.props;
          endLoading();
          this.setState({loading: false});
          alert("Error Loading store products!");
          reject();
        });
    });
  };

  filterStoreProducts = (product) => {
    let { store } = this.props;
    return product.store?.includes(store.id);
  };

  setFilter = (collection) => {
    this.setState({ selectedFilter: collection });
  };

  filterCollectionProducts = (product) => {
    let { selectedFilter } = this.state;
    if (!selectedFilter || selectedFilter === "all products") return true;

    return product.collections?.includes(selectedFilter);
  };

  getCollectionsOfProductAddToStore = (product) => {
    // if product callection name doesn't already exist in tag add it
    const { collections } = product;
    if (!collections?.length) return;
    let { storeCollections } = this.state;
    for (let i = 0; i < collections.length; i++) {
      const collection = collections[i];
      if (storeCollections?.includes(collection)) continue;

      storeCollections.push(collection);
    }

    this.setState({ storeCollections }, () => {
      let { storeCollections } = this.state;
      console.log("COLLECTIONS", storeCollections);
    });
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

  setCollectionsHeight = (collectionsHeight) => {
    this.setState({ collectionsHeight });
  };

  render() {
    let { products, storeCollections, collectionsHeight } = this.state;
    console.log(" StoreProducts STATE", products);

    let { loading } = this.props;

    console.log("REF", { props: this.props, loading }, this.collectionsRef);

    return (
      <div className={styles.store}>
        {this.state.loading && <LoaderComponent />}
        {/* {products.length && (
          <h2
            className={styles.storeHeading}
          >{`${products.length} products listed`}</h2>
        )} */}

        {
          !this.state.loading && storeCollections.length ? (
            <StoreCollections
              collections={storeCollections}
              setCollectionsHeight={this.setCollectionsHeight}
              setFilter={this.setFilter}
            />
          ) : ''
        }

        {!this.state.loading && (
          <div
            className={styles.storeItems}
            style={{
              paddingTop: `${collectionsHeight + 16}px`,
            }}
          >
            {products.length > 0 ? (
              products
                .filter(this.filterCollectionProducts)
                .map((product, index) => {
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
