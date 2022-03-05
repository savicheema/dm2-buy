import React, { createRef } from "react";
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
import NavBar from "../../components/Navbar";
import Basket from "../../components/Cart/Basket";
import ProductSizeFields from "../../components/ProductSizeFields";

export async function getServerSideProps(context) {
  return getProduct(context);
}

class Product extends React.Component {
  constructor(props) {
    super(props);
    let isFetched = true;
    const { product } = props;

    if (product) {
      product.allPhotos = product?.["otherPhotos"];
      product.headerPhoto = product?.["headerPhoto"];
      product.headerDescription = this.cleanProductDescription(
        product?.description
      );
      product.shippingFee = product?.store?.fields?.["shippingFee"] || 0;
      product.shippingFeeCap = product?.store?.fields?.["shippingFeeCap"];
      product.quantity = 1; // set default product quantity to 1
      const customAttributes = product.customAttributes && product.customAttributes.length
      ? product.customAttributes.map((attribute) => {
        const attrib = { ...attribute };
        attrib.ref = React.createRef();
        return attrib;
      }) : [];
      product.customAttributes = customAttributes;
    }
    this.state = {
      isFetched,
      product,
      errorCode: props.errorCode,
      productUrl: props.productUrl,
      open: false,
      productAlreadyInCart: false,
      showCart: false,
      cart: {},
      hideInAdvance: false,
      selectedSize: product.fields.sizeVariants && product.fields.sizeVariants.length
      ? product.fields.sizeVariants[0] : '',
    };

    this.focusActive = false;
  }

  componentDidMount() {
    const { productId } = this.props;
    // console.log({ props: this.props });
    this.customFieldsRef = React.createRef();
    const cartData = StorageManager.getJson(CART_KEY, initialCart);
    this.setState({cart: cartData});
    const productArr = cartData.products.filter(
      (product) => product.id === productId
    );
    if (productArr.length > 0) {

      // let { product } = this.state;
      // product.colour = productArr[0].colour;
      const product = {...this.state.product}
      let selectedColor =  productArr[0].colour;
      let selectedCustomAttributes = productArr[0].customAttributes;
      let selectedSize = productArr[0]['sizeVariants'] && productArr[0]['sizeVariants'].length
       ? productArr[0]['sizeVariants'][0] : (
         product.fields.sizeVariants && product.fields.sizeVariants.length
         ? product.fields.sizeVariants[0] : ''
       );
      
      // console.log('------->',{ prod: this.state.product, product, colorLocal: productArr[0].colour})
      this.setState({ productAlreadyInCart: true, selectedColor, selectedCustomAttributes, selectedSize });
      // this.setState({  });
    }
    if (typeof window != 'undefined') {
      window.document.body.style.scrollBehavior = 'smooth';
      let inputs = window.document.querySelectorAll('input');
      inputs.forEach(input => {
        input.onfocus = () => {
          this.focusActive = true;
        }
        input.onblur = () => {
          setTimeout(() => {
            this.focusActive = false;
          }, 2000);
        }
      });
    }
  }
  showToast = () => {
    this.setState({ open: true });
    setTimeout(() => {
      this.setState({ open: false });
    }, 3000);
  };

  handleShowCart = (boolVal = false) => {
    this.setState({showCart: boolVal});
  }

  updateAddedToCart = (productId, value) => {
    if (this.state.product.id === productId) {
      this.setState({productAlreadyInCart: value});
    }
  }

  render() {
    let { isFetched, product, errorCode, productUrl, selectedColor, selectedCustomAttributes, selectedSize} = this.state;
    console.log(" Product STATE", this.state);

    if (errorCode) {
      return <Error404 statusCode={errorCode} />;
    }

    if (!product) return <LoaderComponent />;

    const homePageEnabled = this.props?.product?.store?.fields?.homePageEnabled;

    return (
      <div className={styles.container}>
        <div className={styles.product}>
          <Head>
            <title>DM 2 BUY</title>
            <meta name="description" content={product.headerDescription} />
            <meta name="title" content={product?.name} />
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
            <meta property="og:title" content={product?.name} />
            <meta
              property="og:description"
              content={product.headerDescription}
            />
            <meta property="og:image" content={product?.headerPhoto?.fields?.file?.url} />
            <meta property="og:site_name" content="Dm 2 Buy" />
            <meta property="og:url" content={productUrl} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:url" content={productUrl} />
            <meta name="twitter:title" content={product?.name} />
            <meta
              property="twitter:description"
              content={product.headerDescription}
            />
            <meta
              property="twitter:image"
              content={product?.headerPhoto?.fields?.file?.url}
            />
          </Head>
          {/* <Header /> */}
          {
            this.state.cart?.products?.length
            ? <Basket
              fromProductPage={true}
              isBasketOpen={this.state.showCart}
              setCart={(value) => this.setState({cart: value})}
              cartData={this.state.cart}
              StorageManager={StorageManager}
              updateAddedToCart={this.updateAddedToCart}
              setHideInAdvance={() => this.setState({hideInAdvance: true})}
              CART_KEY={CART_KEY}
              handleShowCart={this.handleShowCart}/>
            : ''
          }
          <NavBar
            cartActive={this.state.cart?.products?.length ? true : false}
            handleShowCart={this.handleShowCart}
            homeActive={homePageEnabled && homePageEnabled === 'true' ? true : false}
            store={this.props.product?.store}
            storeName={this.props.product?.store?.fields?.store_name || ''}
          />

          <DM2BuyCarousel product={product} />
          <div className={styles.productSub}>
            <div className={styles.productHead}>
              <h1 className={styles.productHeading}>{product.name}</h1>
              {/* <ShareButton /> */}
              <ProductShareButton
                name={product.name}
                toast={this.showToast}
              />
            </div>

            {product && <div className={styles.priceContainer}></div>}
            {product["colourVariants"] ? (
              <ProductColors
                colors={product["colourVariants"]}
                selectedColorInStorage={selectedColor}
                setProductColor={(color) => {
                  let product = {...this.state.product};
                  product.colour = color;
                  this.setState({ product });
                }}
              />
            ) : null}

            {
              product.fields["sizeVariants"] && product.fields["sizeVariants"].length
              ? <ProductSizeFields
                  product={product}
                  selectedSize={selectedSize}
                  updateSelectedSize={(size) => this.setState({selectedSize: size})}
                /> : ''
            }

            <p
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>

            {/* Custom product fields */}
            <ProductCustomFields
              selectedCustomAttributes={selectedCustomAttributes}
              product={product} 
              ref={this.customFieldsRef}
            />

            <div className={styles.callToAction}>
              {product?.product_count === 0 ? (
                <button className={styles.soldOutButton}>Sold Out</button>
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
                    {`${String.fromCharCode(0x20b9)}${product.price}`}
                  </div>
                </button>
              )}
            </div>
            {/* <NoticeConditions /> */}
          </div>
          {/* <SellerCard sellerId={product.Stores[0]} /> */}

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
    if (desc && desc.length) {
      let plainText = desc.replace(/<[^>]+>/g, "");
      plainText = plainText.replace(/(\n)+/, "");
      return plainText.slice(0, 200);
    }
    return '';
  };
  validated = async (product) => {
    let isValid = true;
    const isFocusAble = true;
    for (const ca of product.customAttributes) {
      if ((ca?.fields?.Required === 'Yes') || !ca.fields || !ca) {
        if (!(await ca.ref.current.validate(isFocusAble))) {
          isValid = false;
        }
      }
    }
    return isValid;
  };
  addToCart = async () => {
    const { product } = this.state;
    if (await this.validated(product)) {
      if (typeof window != 'undefined') {
        if (this.focusActive) {
          window.scrollTo(0, 0);
          window.document.body.scrollTop = 0;
        }
      }

      setTimeout(() => {
        this.storeProductToLocalStorage(product);
        // window.location.href = `/cart`;
        const cartData = StorageManager.getJson(CART_KEY, initialCart);
        this.setState({cart: cartData, hideInAdvance: true}, () => {
          if (this.state.cart.products && this.state.cart.products.length === 1) {
            setTimeout(() => {
              this.setState({showCart: true, hideInAdvance: false});
            }, 100);
          } else {
            this.setState({showCart: true, hideInAdvance: false});
          }
          this.updateAddedToCart(product.id, true);
        });
      }, 400);
    }
  };
  storeProductToLocalStorage = (product) => {
    const customAttributes = [];
    for (const ca of product.customAttributes) {
      if (ca.ref.current.state.inputValue.trim() !== "") {
        customAttributes.push({
          name: ca?.fields?.name,
          value: ca.ref.current.state.inputValue,
        });
      }
    }

    if (this.state.selectedSize) {
      product.size = this.state.selectedSize;
    }

    let _product = { ...product };
    _product.customAttributes = customAttributes;
    const cart = StorageManager.getJson(CART_KEY, initialCart);
    const productIndex = cart.products.findIndex((item) => item.id === product.id);
    if (productIndex !== -1) {
      cart.products[productIndex] = _product;
    } else {
      cart.products.push(_product);
    }
    cart.shippingFee = _product.shippingFee;
    cart.shippingFeeCap = _product.shippingFeeCap;
    StorageManager.putJson(CART_KEY, cart);
  };
}

export default Product;
