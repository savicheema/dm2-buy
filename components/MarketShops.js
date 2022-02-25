import React from "react";
import styles from "./market-shops.module.css";
import EmptyMarket from "./EmptyMarket";
import MarketItem from "./MarketItem";

import ShopTags from "./ShopTags";
import LoaderComponent from "./Loader";

class MarketShops extends React.Component {
  constructor(props) {
    super(props);

    let stores = [];
    let shopTags = [];
    let selectedFilter = undefined;

    this.state = {
      stores,
      shopTags,
      selectedFilter,
      loading: true,
      dynamicMarginTop: 0
    };

    this.collectionsRef = React.createRef();
  }

  componentDidMount() {
    let { market } = this.props;
    this.fetchAllStores(market.fields.Shops, market.fields.subdomain);

    if (typeof window != 'undefined') {
      window.addEventListener('resize', this.onPageResize);
      if (this.props.market?.fields?.heroMedia[0]?.url) {
        const dynamicMarginTop = window.document.getElementById("heroImage")
          ? window.document.getElementById("heroImage").clientHeight : 0;

        this.setState({dynamicMarginTop});
      }
    }
  }

  componentWillUnmount() {}

  onPageResize = (event) => {
    if (this.props.market?.fields?.heroMedia[0]?.url) {
      if (typeof window != 'undefined') {
        const dynamicMarginTop = window.document.getElementById("heroImage")
          ? window.document.getElementById("heroImage").clientHeight : 0;

        this.setState({dynamicMarginTop});
      }
    }
  }

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

    return store.fields.category?.includes(selectedFilter);
  };

  getCategoriesOfStoreAddToMarket = (store) => {
    // if store category name doesn't already exist in tag add it
    const { category } = store?.fields;
    if (!category?.length) return;
    let { shopTags } = this.state;
    for (let i = 0; i < category.length; i++) {
      const collection = category[i];
      if (shopTags?.includes(collection)) continue;

      shopTags.push(collection);
    }

    this.setState({ shopTags }, () => {
      let { shopTags } = this.state;
      console.log("category", shopTags);
    });
  };

  setTagHeight = (tagHeight) => {
    this.setState({ tagHeight });
  };

  render() {
    let { stores, shopTags, tagHeight } = this.state;

    let { loading } = this.props;

    return (
      <div className={styles.market} style={{marginTop: this.state.dynamicMarginTop + 38}}>
        {this.state.loading && <LoaderComponent />}

        {
          !this.state.loading && shopTags.length ? (
            <ShopTags
              dynamicMarginTop={this.state.dynamicMarginTop}
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
