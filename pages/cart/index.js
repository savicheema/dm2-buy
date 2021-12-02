import React, { useEffect } from "react";
import cartPageStyles from "./cart-page.module.css";
import Head from "next/head";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getStore } from "../../services/backend/serverSideProps";
import styles from "../../components/Cart/cart.module.css";
import Bag from "../../components/Cart/Bag";

export async function getServerSideProps(context) {
  console.log('======---------========---------');
  return getStore(context);
}

export default function CartPage(props) {
  const [store, setStore] = useLocalStorage("store", props.storeData);

  useEffect(() => {
    if (!store.fields) {
      window.location.href = "/";
    }
  });
  if (!store) {
    return null;
  }
  return (
    <div className={cartPageStyles.container} style={{ minHeight: "" }}>
      <Head>
        <title>{store?.fields?.store_name || "Dm 2 Buy"}</title>
        <meta
          name="description"
          content="Check my shop out and bag my latest drop"
        />
        <link rel="icon" href="/favicon.ico" />
        <link href="/fonts/fonts.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Martel+Sans:wght@900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={store?.fields?.store_name || "Dm 2 Buy"}
        />
        <meta
          property="og:description"
          content="Check my shop out and bag my latest drop"
        />
        <meta property="og:image:secure" content="/favicon.ico" />
      </Head>
      <div className={styles.cart}>
        <Bag />
      </div>
    </div>
  );
}
