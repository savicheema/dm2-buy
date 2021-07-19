import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import orderStyles from "./order.module.css";

export async function getServerSideProps(context) {
  console.log({context})
  return {
    props: {}, // will be passed to the page component as props
  }
}

export default function Order(props) {
  const [status, setStatus] = useState("");
  const [retryLink, setRetryLink] = useState("");
  const router = useRouter();
  const { orderId } = router.query;
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
  };
  useEffect(() => {
    init();
  }, [orderId]);
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
