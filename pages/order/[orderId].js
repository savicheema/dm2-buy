import React, { useEffect, useState } from "react";
import orderStyles from "./order.module.css";
import Head from "next/head";
import LoaderComponent from "../../components/Loader";
import Footer from "../../components/Footer";
import Error404 from "../404";

export async function getServerSideProps(context) {
  const { query } = context;
  let store, errorCode, productUrl;
  const { req } = context;
  const { host } = req.headers;
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
    errorCode = false;
  } catch (e) {
    errorCode = 404;
  }
  return {
    props: {
      orderId: query.orderId,
      store: store || {},
      errorCode,
    }, // will be passed to the page component as props
  };
}

export default function Order(props) {
  const { errorCode } = props;
  const [store, setStore] = useState(props.store);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [retryLink, setRetryLink] = useState("");
  const [meta, setMeta] = useState({
    title: "Dm 2 Buy",
  });
  const [order, setOrder] = useState();
  const { orderId } = props;
  const init = async () => {
    const endpoint = new URL(
      `${window.location.protocol}//${window.location.host}/api/order/order?orderId=${orderId}`
    );
    let json;
    try {
      const resp = await fetch(endpoint);
      json = await resp.json();
      const { order } = json;
      console.log({order, store});
      setOrder(order);
      setStatus(order.payment_status);
      setRetryLink(json.paymentLink);
    } catch (e) {
      alert("something went wrong!");
      console.log({ e });
    }
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    init().finally(() => {
      setLoading(false);
    });
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
                <img src={store?.fields?.creator_thank_you_page_photo[0].url} style={{width: '160px', height: '400px'}} />
              </div>
            </div>
            <p className={orderStyles.feedbackMessage}>
              {store?.fields?.thank_you_note}
            </p>
            <div className={orderStyles.packageDetailContainer}>
              <div className={orderStyles.packageDetailDiv}>
                <div className={orderStyles.packageDetail}>Package Details</div>
                <div className={orderStyles.packageIcon}>📦</div>
              </div>
              <div className={orderStyles.orderDiv}>
                <div className={orderStyles.orderName}>
                  {order.products.map((item) => item.name)}
                </div>
                <div className={orderStyles.orderTotal}>
                  ₹{order.order_total}
                </div>
              </div>
            </div>
            <div style={{ marginTop: 50 }}>
              <p className={orderStyles.paraOne}>
                <h7 className={orderStyles.headingOne}>Shipping</h7>
                ................................................. Ships within 3
                days
              </p>
              <p className={orderStyles.paraOne}>
                <h7 className={orderStyles.headingOne}>Order Updates</h7>
                .........All updates via Email and Whatsapp
              </p>
              <p className={orderStyles.paraOne}>
                <h7 className={orderStyles.headingOne}>Support</h7>.....DM me on
                ig @neikimlhing_ for queries
              </p>
            </div>
            <div className={orderStyles.buyerContainer}>
              <div style={{ width: "90%" }}>
                <div style={{ fontSize: 25 }}>{order.buyer.name}</div>
                <div style={{ marginTop: 10 }}>
                  <div>{order.address.address_line_1}</div>
                  <div>{order.address.city}</div>
                  <div>{order.address.state}</div>
                  <div>{order.address.pincode}</div>
                  <div></div>
                  <div>PH.+{order.buyer.phone}</div>
                </div>
              </div>
              <div className={orderStyles.homeIcon}>🏠</div>
            </div>
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
            <div className={orderStyles.packageDetailContainer}>
              <div className={orderStyles.packageDetailDiv}>
                <div className={orderStyles.packageDetail}>Package Details</div>
                <div className={orderStyles.packageIcon}>📦</div>
              </div>
              <div className={orderStyles.orderDiv}>
                <div className={orderStyles.orderName}>
                  {order.products.map((item) => item.name)}
                </div>
                <div className={orderStyles.orderTotal}>
                  ₹{order.order_total}
                </div>
              </div>
            </div>
            <div className={orderStyles.buyerContainer}>
              <div className={orderStyles.buyerInfo}>
                <div className={orderStyles.buyerName}>{order.buyer.name}</div>
                <div className={orderStyles.buyerAddress}>
                  <div>{order.address.address_line_1}</div>
                  <div>{order.address.city}</div>
                  <div>{order.address.state}</div>
                  <div>{order.address.pincode}</div>
                  <div></div>
                  <div>PH.+{order.buyer.phone}</div>
                </div>
              </div>
              <div className={orderStyles.homeIcon}>🏠</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
