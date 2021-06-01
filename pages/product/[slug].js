import React from "react";
import Head from "next/head";

import styles from "./product.module.css";
import homeStyles from "../../styles/Home.module.css";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

import Header from "../../components/Header";
import { ShareButton } from "../../components/Buttons";
import PrevArrow from "../../components/Carousel/PrevArrow";
import NoticeConditions from "../../components/NoticeConditions";
import SellerCard from "../../components/SellerCard";
import Footer from "../../components/Footer";
import ProductShareButton from "../../components/Buttons/ProductShareButton";

class Product extends React.Component {
  render() {
    let { isFetched, product } = this.state;
    console.log(" Product STATE", isFetched, product);

    if (!product) return null;

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

        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true}>
          {product.allPhotos &&
            product.allPhotos.map((photo, index) => {
              return (
                <Image src={photo.url} height="425" width="360" key={index} />
              );
            })}
        </Carousel>
        <div className={styles.productSub}>
          <div className={styles.productHead}>
            <h1 className={styles.productHeading}>{product.fields.Name}</h1>
            {/* <ShareButton /> */}
            <ProductShareButton />
          </div>
          {/* <div className={styles.price}>
          {product.fields &&
            `${String.fromCharCode(0x20b9)}${product.fields.Price}`}
        </div> */}
          {product.fields && (
            <div className={styles.priceContainer}>
              {String.fromCharCode(0x20b9)}
              <span className={styles.price}>{product.fields.Price}</span>
            </div>
          )}
          <div className={styles.shipping}>
            <span>Ships</span>
            <span className={styles.day}>Tomorrow</span>
          </div>
          <div className={styles.callToAction}>
            {product.fields.Status === "for-sale" && (
              <button
                className={styles.buyNowButton}
                onClick={() => {
                  this.storeProductToLocalStorage(product);
                  window.location.href = `/cart/checkout`;
                }}
              >
                Buy Now
              </button>
            )}
            {product.fields.Status !== "for-sale" && (
              <button className={styles.soldOutButton}>Sold Out</button>
            )}
          </div>
          {/* <div className={styles.shipping}>
            <span>Ships</span>
            <span className={styles.day}>Tomorrow</span>
          </div>
          <div className={styles.callToAction}>
            {product.fields.Status === "for-sale" && (
              <button className={styles.buyNowButton}>Buy Now</button>
            )}
            {product.fields.Status !== "for-sale" && (
              <button className={styles.soldOutButton}>Sold Out</button>
            )}
          </div> */}
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: product.fields.description }}
          ></p>

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

    let isFetched = false;
    let product = undefined;

    this.state = { isFetched, product };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (!productId) console.error("Product ID not available");
    this.fetchProduct(productId)
      .then((product) => {
        console.log("Do something", product);
        product.allPhotos = product.fields["header photo"].concat(
          product.fields["Other photos"]
        );
        this.setState({ isFetched: true, product });
      })
      .catch(() => {
        console.error("Do nothing!");
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
