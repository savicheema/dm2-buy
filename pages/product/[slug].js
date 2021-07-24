import React from "react";
import Head from "next/head";
import Error404 from '../404'
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

export async function getServerSideProps(context) {
  let product, errorCode;
  const { req } = context;
  const splitArr = req.url.split("-");
  const productId = splitArr[splitArr.length - 1];
  const { host } = req.headers;
  const splitHost = host.split(".");
  const subdomain =
    splitHost[0] == "localhost:3000" || splitHost[0] == "192"
      ? "fxnoob"
      : splitHost[0];
  const hostWithProtocol = host === 'localhost:3000'? `http://${host}`: `https://${host}`;
  console.log({ productId, subdomain });
  try {
    const response = await fetch(
      `${hostWithProtocol}/api/airtable/getProduct?product=${productId}&subdomain=${subdomain}`
    );
    product = await response.json();
    if (product.error) {
      throw new Error(product.error);
    }
    errorCode = false;
  } catch (e) {
    errorCode = 404;
  }
  return {
    props: { productId, product: product || null, errorCode }, // will be passed to the page component as props
  };
}

class Product extends React.Component {
  render() {
    let { isFetched, product, errorCode } = this.state;
    console.log(" Product STATE", isFetched, product, errorCode);

    if (errorCode) {
      return <Error404 statusCode={errorCode} />
    }

    if (!product) return <LoaderComponent />;

    return (
      <div className={styles.container}>
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
                  Buy For{" "}
                  {`${String.fromCharCode(0x20b9)}${product.fields.Price}`}
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
      </div>
    );
  }

  constructor(props) {
    super(props);
    let isFetched = true;
    const {product } = props;
    if (product.fields) {
      product.allPhotos = product?.fields["Other photos"];
    }
    this.state = { isFetched, product, errorCode: props.errorCode };
    console.log({state: this.state})
  }

  storeProductToLocalStorage = (product) => {
    localStorage.setItem("product", JSON.stringify(product));
  };
}

export default Product;
