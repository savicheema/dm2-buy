import React, { useState } from "react";
import Head from "next/head";
import Error404 from "../404";
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
import Toast from "../../components/Toast";
import { getProduct } from "../../services/backend/serverSideProps";
import StorageManager from "../../services/frontend/StorageManager";
import { CART_KEY } from "../../services/frontend/StorageKeys";

export async function getServerSideProps(context) {
  return getProduct(context);
}

class Product extends React.Component {
  componentDidMount() {
    const { productId } = this.props;
    const cartData = StorageManager.getJson(CART_KEY, []);
    const productArr = cartData.filter((product) => product.id === productId);
    if (productArr.length > 0) {
      this.setState({ productAlreadyInCart: true });
    }
  }
  showToast = () => {
    this.setState({ open: true });
    setTimeout(() => {
      this.setState({ open: false });
    }, 3000);
  };
  render() {
    let { isFetched, product, errorCode, productUrl } = this.state;
    console.log(" Product STATE", isFetched, product, errorCode);

    if (errorCode) {
      return <Error404 statusCode={errorCode} />;
    }

    if (!product) return <LoaderComponent />;

    return (
      <div className={styles.container}>
        <div className={styles.product}>
          <Head>
            <title>DM 2 BUY</title>
            <meta name="description" content={product.headerDescription} />
            <meta name="title" content={product?.fields?.Name} />
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
            <meta property="og:type" content="product" />
            <meta property="og:title" content={product?.fields?.Name} />
            <meta
              property="og:description"
              content={product.headerDescription}
            />
            <meta property="og:image" content={product?.headerPhoto[0]?.url} />
            <meta property="og:site_name" content="Dm 2 Buy" />
            <meta property="og:url" content={productUrl} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content={productUrl} />
            <meta name="twitter:title" content={product?.fields?.Name} />
            <meta
              property="twitter:description"
              content={product.headerDescription}
            />
            <meta
              property="twitter:image"
              content={product?.headerPhoto[0]?.url}
            />
          </Head>
          {/* <Header /> */}

          <DM2BuyCarousel product={product} />
          <div className={styles.productSub}>
            <div className={styles.productHead}>
              <h1 className={styles.productHeading}>{product.fields.Name}</h1>
              {/* <ShareButton /> */}
              <ProductShareButton
                name={product.fields.Name}
                toast={this.showToast}
              />
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
                    window.location.href = `/cart`;
                  }}
                >
                  <div>
                    {this.state.productAlreadyInCart
                      ? "Added to Bag"
                      : "Add to Bag"}
                  </div>
                  <div>
                    {`${String.fromCharCode(0x20b9)}${product.fields.Price}`}
                  </div>
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
          <Toast
            type="success"
            message="Link copied successfully"
            open={this.state.open}
          />
        </div>
      </div>
    );
  }

  constructor(props) {
    super(props);
    let isFetched = true;
    const { product } = props;
    if (product.fields) {
      product.allPhotos = product?.fields["Other photos"];
      product.headerPhoto = product?.fields["header_photo"];
      product.headerDescription = this.cleanProductDescription(
        product?.fields?.description
      );
    }
    this.state = {
      isFetched,
      product,
      errorCode: props.errorCode,
      productUrl: props.productUrl,
      open: false,
      productAlreadyInCart: false,
    };
    console.log({ state: this.state });
  }
  cleanProductDescription = (desc) => {
    let plainText = desc.replace(/<[^>]+>/g, "");
    plainText = plainText.replace(/(\n)+/, "");
    return plainText.slice(0, 200);
  };
  storeProductToLocalStorage = (product) => {
    if (this.state.productAlreadyInCart) {
      return;
    }
    const cartData = StorageManager.getJson(CART_KEY, []);
    cartData.push(product);
    StorageManager.putJson(CART_KEY, cartData);
    console.log({ cartData });
  };
}

export default Product;
