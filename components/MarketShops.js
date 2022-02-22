import React from "react";
import styles from "./market-shops.module.css";
import EmptyMarket from "./EmptyMarket";
import MarketItem from "./MarketItem";
import { getSubDomainOfPage } from "../services/helper";

import ShopTags from "./ShopTags";
import LoaderComponent from "./Loader";

class MarketShops extends React.Component {
  constructor(props) {
    super(props);

    let stores = [];
    let shopTags = [];
    let tagHeight = 0;
    let selectedFilter = undefined;

    this.state = {
      stores,
      shopTags,
      selectedFilter,
      loading: true
    };

    this.collectionsRef = React.createRef();
  }

  componentDidMount() {
    let { market } = this.props;
    this.fetchAllStores(market.fields.Shops, market.fields.subdomain);
  }
  componentWillUnmount() {}

  fetchAllStores = (stores, subdomain) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/airtable/getAllStores?subdomain=${subdomain}`)
        .then((response) => {
          return response.json();
        })
        .then((storeValues) => {
          console.log("store RESPONSE", storeValues);
          this.setState(
            {
              stores: storeValues.records,
            },
            () => {
              let { endLoading } = this.props;
              let { stores } = this.state;

              // stores.forEach(this.getCollectionsOfProductAddToStore);

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
          alert("Error Loading store stores!");
          reject();
        });
    });
  };
  setFilter = (collection) => {
    this.setState({ selectedFilter: collection });
  };

  filterCollectionProducts = (product) => {
    let { selectedFilter } = this.state;
    if (!selectedFilter || selectedFilter === "all stores") return true;

    return store.fields.category?.includes(selectedFilter);
  };

//   getCollectionsOfProductAddToStore = (product) => {
//     // if product callection name doesn't already exist in tag add it
//     const { collections } = product?.fields;
//     if (!collections?.length) return;
//     let { storeCollections } = this.state;
//     for (let i = 0; i < collections.length; i++) {
//       const collection = collections[i];
//       if (storeCollections?.includes(collection)) continue;

//       storeCollections.push(collection);
//     }

//     this.setState({ storeCollections }, () => {
//       let { storeCollections } = this.state;
//       console.log("COLLECTIONS", storeCollections);
//     });
//   };

//   fetchProduct = (productId, subdomain) => {
//     return new Promise((resolve, reject) => {
//       fetch(
//         `/api/airtable/getProduct?product=${productId}&subdomain=${subdomain}`
//       )
//         .then((response) => {
//           console.log("product RESPONSE", response);
//           return response.json();
//         })
//         .then((data) => {
//           console.log("product DATA", data);
//           resolve(data);
//         })
//         .catch((err) => {
//           console.error(err);
//           reject();
//         });
//     });
//   };

  setTagHeight = (tagHeight) => {
    this.setState({ tagHeight });
  };

  render() {
    let { stores, shopTags, tagHeight } = this.state;

    let { loading } = this.props;

    return (
      <div className={styles.market}>
        {this.state.loading && <LoaderComponent />}
        {/* {products.length && (
          <h2
            className={styles.storeHeading}
          >{`${products.length} products listed`}</h2>
        )} */}

        {
          !this.state.loading && shopTags.length ? (
            <ShopTags
              tags={marketTags}
              setTagHeight={this.setTagHeight}
              setFilter={this.setFilter}
            />
          ) : ''
        }

        {!this.state.loading && (
          <div
            className={styles.marketItems}
            style={{
              paddingTop: `${tagHeight + 16}px`,
            }}
          >
            {stores && stores.length > 0 ? (
              stores
                .filter(this.filterCollectionProducts)
                .map((store, index) => {
                  return <MarketItem store={store} key={index} />;
                })
            ) : (
              <EmptyMarket />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default MarketShops;
