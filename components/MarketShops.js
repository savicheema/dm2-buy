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

              stores.forEach(this.getCategoriesOfStoreAddToMarket);

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

  filterTagStores = (store) => {
    let { selectedFilter } = this.state;
    if (!selectedFilter || selectedFilter === "all shops") return true;

    return store.fields.Categories?.includes(selectedFilter);
  };

  getCategoriesOfStoreAddToMarket = (store) => {
    // if store category name doesn't already exist in tag add it
    const { Categories } = store?.fields;
    if (!Categories?.length) return;
    let { shopTags } = this.state;
    for (let i = 0; i < Categories.length; i++) {
      const collection = Categories[i];
      if (shopTags?.includes(collection)) continue;

      shopTags.push(collection);
    }

    this.setState({ shopTags }, () => {
      let { shopTags } = this.state;
      console.log("Categories", shopTags);
    });
  };

  setTagHeight = (tagHeight) => {
    this.setState({ tagHeight });
  };

  render() {
    let { stores, shopTags, tagHeight } = this.state;

    let { loading } = this.props;

    return (
      <div className={styles.market}>
        {this.state.loading && <LoaderComponent />}

        {
          !this.state.loading && shopTags.length ? (
            <ShopTags
              tags={shopTags}
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
                .filter(this.filterTagStores)
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
