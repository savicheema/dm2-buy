import React, { useState } from "react";
import orderStyles from "./order.module.css";
import Head from "next/head";
import LoaderComponent from "../../components/Loader";
import Footer from "../../components/Footer";
import Error404 from "../404";
import PackageExtraDetails from "../../components/OrderDetails/PackageExtraDetails";
import PackageDetails from "../../components/OrderDetails/PackageDetails";
import BuyerDetails from "../../components/OrderDetails/BuyerDetails";

export async function getServerSideProps(context) {
  let store, errorCode, order;
  const { query, req } = context;
  const { host } = req.headers;
  const { orderId  } = context.params;
  const splitHost = host.split(".");
  const subdomain =
    splitHost[0] == "localhost:3000" || splitHost[0] == "192"
      ? "fxnoob"
      : splitHost[0];
  const hostWithProtocol =
    host === "localhost:3000" ? `http://${host}` : `https://${host}`;
  try {
    const response = await fetch(
      `${hostWithProtocol}/api/airtable/getRecord?subdomain=${subdomain}`
    );
    store = await response.json();
    if (store.error) {
      throw new Error(store.error);
    }
    const orderResponse = await fetch(
      `${hostWithProtocol}/api/order/order?orderId=${orderId}`
    );
    const json = await orderResponse.json();
    const { order: orderDetails } = json;
    order = orderDetails;
    errorCode = false;
  } catch (e) {
    errorCode = 404;
    order = null;
  }
  return {
    props: {
      orderId: query.orderId,
      store: store || {},
      errorCode,
      order,
    }, // will be passed to the page component as props
  };
}

export default function Order(props) {
  const { errorCode, order, store } = props;
  const [loading, setLoading] = useState(false);
  const status = order?.payment_status;
  const retryLink = order?.paymentLink;
  const [meta, setMeta] = useState({
    title: "Dm 2 Buy",
  });
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

  const creatorThankYouPagePhoto = store?.fields?.creator_thank_you_page_photo
    ? store?.fields?.creator_thank_you_page_photo[0].url
    : false;

  return (
    <div className={orderStyles.container}>
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
              <div style={{ width: "40%" }}>
                <img src="/success-emoji.svg" />
                <h1>Order Successful</h1>
                <p className={orderStyles.successMessage}>
                  {store?.fields?.order_confirmation_thank_you_message}
                </p>
              </div>
              <div className={orderStyles.influencerImage}>
                {creatorThankYouPagePhoto && (
                  <img
                    src={creatorThankYouPagePhoto}
                    style={{ width: "160px", height: "400px" }}
                  />
                )}
              </div>
            </div>
            <p className={orderStyles.feedbackMessage}>
              {store?.fields?.thank_you_note}
            </p>
            <PackageDetails
              className={orderStyles.packageDetailContainer}
              order={order}
            />
            <PackageExtraDetails
              instaUserId={store?.fields?.store_instagram_handle}
            />
            <BuyerDetails
              className={orderStyles.buyerContainer}
              order={order}
            />
            <div
              style={{
                marginTop: 100,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <h2>dm2buy</h2>
            </div>
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
            <PackageDetails
              className={orderStyles.packageDetailContainer}
              order={order}
            />
            <BuyerDetails
              className={orderStyles.buyerContainer}
              order={order}
            />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
