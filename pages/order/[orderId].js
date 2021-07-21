import React, { useEffect, useState } from "react";
import orderStyles from "./order.module.css";
import Head from "next/head";
import LoaderComponent from "../../components/Loader";

export async function getServerSideProps(context) {
  const { query } = context;
  console.log({ context });
  return {
    props: { orderId: query.orderId }, // will be passed to the page component as props
  };
}

export default function Order(props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [retryLink, setRetryLink] = useState("");
  const [meta, setMeta] = useState({
    title: "Dm 2 Buy",
  });
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
    setTimeout(init, 5000);
  }, []);
  const popUpFrame = (paymentLink) => {
    const popup = window.open(
      paymentLink,
      "newwindow",
      "height=600,width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, directories=no, status=no"
    );
    popup.onclose = () => {
      console.log("Pop up close");
    };
  };
  const openPopup = () => {
    popUpFrame(retryLink);
  };
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
          <div className={orderStyles.containerChildPadding}>
            <div>
              <div className={orderStyles.section1}>
                <div>
                  <div className={orderStyles.successHand}>🤟</div>
                  <div className={orderStyles.orderSuccessfulTitle}>
                    Order Successful
                  </div>
                  <div className={orderStyles.thankYouNote}>
                    "Hey, Kim here. Thank you so much for buying from my shop. I
                    hope the products bring you as much joy as they brought me
                    through the course of curating them. Feel free to DM me on
                    instagram @neikimlhing_ if
                  </div>
                </div>
                <div className={orderStyles.productPhoto}></div>
              </div>
            </div>
            <div className={orderStyles.feedbackNote}>
              you have any feedback for me, I'd love to hear from you." 💜
            </div>
          </div>
        )}
        {status == "payment_pending" && (
          <div>
            Payment is pending. please{" "}
            <button onClick={openPopup}>retry</button>
          </div>
        )}
      </div>
    </div>
  );
}
