import React, { useEffect, useState } from "react";
import orderStyles from "./order.module.css";
import Head from "next/head";
import LoaderComponent from "../../components/Loader";
import Footer from "../../components/Footer";
import Error404 from "../404";
import PackageExtraDetails from "../../components/OrderDetails/PackageExtraDetails";
import PackageDetails from "../../components/OrderDetails/PackageDetails";
import BuyerDetails from "../../components/OrderDetails/BuyerDetails";
import { getOrderDetail } from "../../services/backend/serverSideProps";
import StorageManager from "../../services/frontend/StorageManager";
import { CART_KEY } from "../../services/frontend/StorageKeys";
import useLocalStorage from "../../hooks/useLocalStorage";
import { initialCart } from "../../services/ObjectsInitialValues";
import Basket from "../../components/Cart/Basket";
import NavBar from "../../components/NavBar";

export async function getServerSideProps(context) {
  return getOrderDetail(context);
}

export default function Order(props) {
  const [cart, setCart] = useLocalStorage(CART_KEY, initialCart);
  const homePageEnabled = props.store?.fields?.homePageEnabled;
  const [showCart, setShowCart] = useState(false);
  const { errorCode, order, store, retryLink } = props;
  const [loading, setLoading] = useState(false);
  const status = order?.payment_status;
  const [meta, setMeta] = useState({
    title: "Dm 2 Buy",
  });
  useEffect(() => {
    StorageManager.removeItem(CART_KEY);
  }, []);
  const popUpFrame = (paymentLink) => {
    const popup = window.open(
      paymentLink,
      "_self",
      "height=600,width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, directories=no, status=no"
    );
    popup.onclose = () => {
      console.log("Pop up close");
    };
  };
  const openPopup = () => {
    popUpFrame(retryLink);
  };

  if (errorCode) {
    return <Error404 statusCode={errorCode} />;
  }

  const handleShowCart = (boolVal = false) => {
    setShowCart(boolVal);
  }

  const creatorThankYouPagePhoto = store?.fields?.creator_thank_you_page_photo
    ? store?.fields?.creator_thank_you_page_photo[0].url
    : false;

  return (
    <div className={orderStyles.container}>
      <Basket
        isBasketOpen={showCart}
        setCart={setCart}
        cartData={cart}
        StorageManager={StorageManager}
        CART_KEY={CART_KEY}
        handleShowCart={handleShowCart}/>
      {
        !showCart
        && <NavBar
          hideInAdvance={false}
          cartActive={false}
          handleShowCart={handleShowCart}
          homeActive={homePageEnabled && homePageEnabled === 'true' ? true : false}
          storeName={store?.fields?.store_name || ''}
        />
      }
      <Head>
        <title>{meta.title}</title>
        <meta
          name="description"
          content="Check my shop out and bag my latest drop"
        />
        <link rel="icon" href="/favicon.ico" />
        <link href="/fonts/fonts.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={meta.title} />
        <meta
          property="og:description"
          content="Check my shop out and bag my latest drop"
        />
        <meta property="og:image:secure" content="/favicon.ico" />
      </Head>
      {loading && <LoaderComponent />}
      <div className={orderStyles.containerChild}>
        {status == "complete" && (
          <div className={orderStyles.paymentSuccessContainer}>
            <div className={orderStyles.successDiv}>
              <div className={orderStyles.container1}>
                <div className={orderStyles.successMessage}>
                  {creatorThankYouPagePhoto && (
                    <img
                      src={creatorThankYouPagePhoto}
                      className={orderStyles.floated}
                    />
                  )}
                  <img src="/favicon.ico" />
                  <h1 className={orderStyles.orderSuccess}>Order Successful</h1>
                  <p
                    className={orderStyles.thankyouText}
                    dangerouslySetInnerHTML={{
                      __html:
                        store?.fields?.order_confirmation_thank_you_message,
                    }}
                  ></p>
                </div>
              </div>
            </div>
            <PackageDetails order={order} />
            <PackageExtraDetails
              dispatchTime={store?.fields["Dispatch Time"]}
              instaUserId={store?.fields?.store_instagram_handle}
            />
            <BuyerDetails order={order} />
          </div>
        )}
        {status == "payment_pending" && (
          <div className={orderStyles.paymentFailedContainer}>
            <div className={orderStyles.failedMessageContainer}>
              <div>
                <p className={orderStyles.errorHeader}> Payment Failed </p>
                <p className={orderStyles.errorText}>
                  There seems to be an issue with the last transaction and your
                  payment for ₹{order.order_total} didn’t come through.
                </p>
                <button onClick={openPopup} className={orderStyles.retryButton}>
                  Try again
                </button>
              </div>
              <div>
                <img src="/noun-warning-4059833.svg" />
              </div>
            </div>
            <PackageDetails order={order} />
            <BuyerDetails order={order} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
