import React, { useEffect, useState } from 'react';
import orderStyles from './order.module.css';
import Head from 'next/head';
import LoaderComponent from '../../components/Loader';

export async function getServerSideProps(context) {
  const { query } = context;
  return {
    props: { orderId: query.orderId } // will be passed to the page component as props
  };
}

export default function Order(props) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [retryLink, setRetryLink] = useState('');
  const [meta, setMeta] = useState({
    title: 'Dm 2 Buy'
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
      console.log(order);
      setOrder(order);
      setStatus(order.payment_status);
      setRetryLink(json.paymentLink);
    } catch (e) {
      alert('something went wrong!');
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
      'newwindow',
      'height=600,width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, directories=no, status=no'
    );
    popup.onclose = () => {
      console.log('Pop up close');
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
          name='description'
          content='Check my shop out and bag my latest drop'
        />
        <link rel='icon' href='/favicon.ico' />
        <link href='/fonts/fonts.css' rel='stylesheet' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link
          href='https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0'
        />

        <meta property='og:type' content='website' />
        <meta property='og:title' content={meta.title} />
        <meta
          property='og:description'
          content='Check my shop out and bag my latest drop'
        />
        <meta property='og:image:secure' content='/favicon.ico' />
      </Head>
      {loading && <LoaderComponent />}
      <div className={orderStyles.containerChild}>
        {status == 'complete' && (
          <div className={orderStyles.paymentSuccessContainer}>
            <div className={orderStyles.successDiv}>
              <div style={{ width: '40%' }}>
                <img src='/success-emoji.svg' />
                <h1>Order Successful</h1>
                <p className={orderStyles.successMessage}>
                  "Hey, Kim here. Thank you so much for buying from my shop. I
                  hope the products bring you as much joy as they brought me
                  through the course of curating them. Feel free to DM me on
                  instagram @neikimlhing_ if
                </p>
              </div>
              <div className={orderStyles.influencerImage}>
                <img src='/kim.png' />
              </div>
            </div>
            <p className={orderStyles.feedbackMessage}>
              you have any feedback for me, I'd love to hear from you." 💜
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
              <div style={{ width: '90%' }}>
                <div style={{ fontSize: 25 }}>{order.buyer.name}</div>
                <div style={{ marginTop: 10 }}>
                  <div>{order.address.address_line_1}</div>
                  <div>{order.address.city}</div>
                  <div>{order.address.state}</div>
                  <div>{order.address.divincode}</div>
                  <div></div>
                  <div>PH.+{order.buyer.phone}</div>
                </div>
              </div>
              <div className={orderStyles.homeIcon}>🏠</div>
            </div>
            <div
              style={{
                marginTop: 100,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <h2>dm2buy</h2>
            </div>
          </div>
        )}
        {status == 'payment_pending' && (
          <div className={orderStyles.paymentFailedContainer}>
            <div className={orderStyles.failedMessageContainer}>
              <div>
                <p> Payment Failed </p>
                <p>
                  There seems to be an issue with the last transaction and your
                  payment for ₹{order.order_total} didn’t come through
                </p>
                <button onClick={openPopup} className={orderStyles.retryButton}>
                  <img src='/group.svg' />
                  Retry
                </button>
              </div>
              <div>
                <img src='/noun-warning-4059833.svg' />
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
              <div style={{ width: '90%' }}>
                <div style={{ fontSize: 25 }}>{order.buyer.name}</div>
                <div style={{ marginTop: 10 }}>
                  <div>{order.address.address_line_1}</div>
                  <div>{order.address.city}</div>
                  <div>{order.address.state}</div>
                  <div>{order.address.divincode}</div>
                  <div></div>
                  <div>PH.+{order.buyer.phone}</div>
                </div>
              </div>
              <div className={orderStyles.homeIcon}>🏠</div>
            </div>
            <div
              style={{
                marginTop: 100,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <h2>dm2buy</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
