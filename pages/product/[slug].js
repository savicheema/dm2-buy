import React from "react";
import Head from "next/head";
import Error404 from "../404";
import styles from "./product.module.css";
import Footer from "../../components/Footer";
import LoaderComponent from "../../components/Loader";
import DM2BuyCarousel from "../../components/Carousel";
import ProductShareButton from "../../components/Buttons/ProductShareButton";
import Toast from "../../components/Toast";
import { getProduct } from "../../services/backend/serverSideProps";
import StorageManager from "../../services/frontend/StorageManager";
import { CART_KEY } from "../../services/frontend/StorageKeys";
import { initialCart } from "../../services/ObjectsInitialValues";
import ProductCustomFields from "../../components/ProductCustomFields";
import ProductColors from "../../components/ProductColors";

export async function getServerSideProps(context) {
  return getProduct(context);
}

class Product extends React.Component {
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
      product.shippingFee = product?.store?.fields["Shipping Fee"] || 0;
      product.shippingFeeCap = product?.store?.fields["Shipping fee Cap"];
      product.quantity = 1; // set default product quantity to 1
      const customAttributes = product.customAttributes.map((attribute) => {
        const attrib = { ...attribute };
        attrib.ref = React.createRef();
        return attrib;
      });
      product.customAttributes = customAttributes;
    }
    this.state = {
      isFetched,
      product,
      errorCode: props.errorCode,
      productUrl: props.productUrl,
      open: false,
      productAlreadyInCart: false,
    };
  }

  componentDidMount() {
    const { productId } = this.props;
    // console.log({ props: this.props });
    this.customFieldsRef = React.createRef();
    const cartData = StorageManager.getJson(CART_KEY, initialCart);
    const productArr = cartData.products.filter(
      (product) => product.id === productId
    );
    if (productArr.length > 0) {

      // let { product } = this.state;
      // product.colour = productArr[0].colour;
      const product = {...this.state.product}
      let selectedColor =  productArr[0].colour;
      let selectedCustomAttributes = productArr[0].customAttributes;
      
      // console.log('------->',{ prod: this.state.product, product, colorLocal: productArr[0].colour})
      this.setState({ productAlreadyInCart: true, selectedColor, selectedCustomAttributes });
      // this.setState({  });
    }
  }
  showToast = () => {
    this.setState({ open: true });
    setTimeout(() => {
      this.setState({ open: false });
    }, 3000);
  };
  render() {
    let { isFetched, product, errorCode, productUrl, selectedColor, selectedCustomAttributes } = this.state;
    console.log(" Product STATE", this.state);

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
            {product.fields["colour variants"] ? (
              <ProductColors
                colors={product.fields["colour variants"]}
                selectedColorInStorage={selectedColor}
                setProductColor={(color) => {
                  let product = {...this.state.product};
                  product.colour = color;
                  this.setState({ product });
                }}
              />
            ) : null}

            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: product.fields.description }}
            ></p>

            {/* Custom product fields */}
            <ProductCustomFields
              selectedCustomAttributes={selectedCustomAttributes}
              product={product} 
              ref={this.customFieldsRef}
            />

            <div className={styles.callToAction}>
              {product.fields?.product_count === 0 ? (
                <button className={styles.soldOutButton}>Currently Unavailable</button>
              ) : (
                <button
                  className={styles.buyNowButton}
                  onClick={this.addToCart}
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

  cleanProductDescription = (desc) => {
    let plainText = desc.replace(/<[^>]+>/g, "");
    plainText = plainText.replace(/(\n)+/, "");
    return plainText.slice(0, 200);
  };
  validated = async (product) => {
    let isValid = true;
    const isFocusAble = true;
    for (const ca of product.customAttributes) {
      if (!(await ca.ref.current.validate(isFocusAble))) {
        isValid = false;
      }
    }
    return isValid;
  };
  addToCart = async () => {
    const { product } = this.state;
    if (await this.validated(product)) {
      this.storeProductToLocalStorage(product);
      window.location.href = `/cart`;
    }
  };
  storeProductToLocalStorage = (product) => {
    const customAttributes = [];
    for (const ca of product.customAttributes) {
      if (ca.ref.current.state.inputValue.trim() !== "") {
        customAttributes.push({
          name: ca?.fields?.Name,
          value: ca.ref.current.state.inputValue,
        });
      }
    }
    product.customAttributes = customAttributes;
    const cart = StorageManager.getJson(CART_KEY, initialCart);
    const productIndex = cart.products.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      cart.products[productIndex] = product;
    } else {
      cart.products.push(product);
    }
    cart.shippingFee = product.shippingFee;
    cart.shippingFeeCap = product.shippingFeeCap;
    StorageManager.putJson(CART_KEY, cart);
  };
}

export default Product;
