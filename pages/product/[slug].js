import React from "react";
import Head from "next/head";

import styles from "./product.module.css";
import homeStyles from "../../styles/Home.module.css";

import Header from "../../components/Header";
import { ShareButton } from "../../components/Buttons";
import PrevArrow from "../../components/Carousel/PrevArrow";
import NoticeConditions from "../../components/NoticeConditions";
import SellerCard from "../../components/SellerCard";
import Footer from "../../components/Footer";
import LoaderComponent from "../../components/Loader";
import DM2BuyCarousel from "../../components/Carousel";
import ProductShareButton from "../../components/Buttons/ProductShareButton";

class Product extends React.Component {
  render() {
    let { isFetched, product } = this.state;
    console.log(" Product STATE", isFetched, product);

    if (!product) return <LoaderComponent />;

    return (
      <div className={styles.product}>
        <Head>
          <title>DM 2 BUY</title>
          <meta
            name="description"
            content="Take your side hustle to next level."
          />
          <link rel="icon" href="/favicon.ico" />
          <link href="/fonts/fonts.css" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
          />
        </Head>
        {/* <Header /> */}

        <DM2BuyCarousel product={product} />
        <div className={styles.productSub}>
          <div className={styles.productHead}>
            <h1 className={styles.productHeading}>{product.fields.Name}</h1>
            {/* <ShareButton /> */}
            <ProductShareButton name={product.fields.Name} />
          </div>

          {product.fields && <div className={styles.priceContainer}></div>}

          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.fields.description }}
          ></p>

          <div className={styles.callToAction}>
            {product.fields.Status === "for-sale" && (
              <button
                className={styles.buyNowButton}
                onClick={() => {
                  this.storeProductToLocalStorage(product);
                  window.location.href = `/cart/checkout`;
                }}
              >
                Buy Now{" "}
                {`${String.fromCharCode(0x20b9)} ${product.fields.Price}`}
              </button>
            )}
            {product.fields.Status !== "for-sale" && (
              <button className={styles.soldOutButton}>Sold Out</button>
            )}
          </div>

          {/* <NoticeConditions /> */}
        </div>
        {/* <SellerCard sellerId={product.fields.Stores[0]} /> */}

        {/* <footer className={homeStyles.footer}>
          <Image src="/instagram.png" width="36" height="36" />
          <div className={homeStyles.footerTagline}>
            <span>Follow us on IG</span>
            <span>@dm2buydotcom</span>
          </div>
        </footer> */}

        <Footer />
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isFetched = true;
    let product = undefined;

    this.state = { isFetched, product };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (!productId) console.error("Product ID not available");
    this.setState({ isFetched: false }, () => {
      this.fetchProduct(productId)
        .then((product) => {
          console.log("Do something", product);
          // product.allPhotos = product.fields["header photo"].concat(
          //   product.fields["Other photos"]
          // );
          product.allPhotos = product.fields["Other photos"];
          this.setState({ isFetched: true, product });
        })
        .catch(() => {
          this.setState({ isFetched: true });
          console.error("Do nothing!");
        });
    });
  }

  componentWillUnmount() {}

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

  storeProductToLocalStorage = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
  };
}

export default Product;
