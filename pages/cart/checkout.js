import React, { useEffect } from "react";
import homeStyles from "../../styles/Home.module.css";
import Head from "next/head";
import Cart from "../../components/Cart";
import useLocalStorage from "../../hooks/useLocalStorage";
import { getStore } from "../../services/backend/serverSideProps";
import { CART_KEY } from "../../services/frontend/StorageKeys";
import { initialCart } from "../../services/ObjectsInitialValues";

export async function getServerSideProps(context) {
  return getStore(context);
}

export default function CheckoutPage(props) {
  const [cart, setCart] = useLocalStorage(CART_KEY, initialCart);
  const [store, setStore] = useLocalStorage("store", props.storeData);
  useEffect(() => {
    if (!cart || !store.fields) {
      window.location.href = "/";
    }
  });
  function applyPromoCode(percentageDiscount, couponId, couponCode) {
    setCart({...cart, percentageDiscount, couponId, couponCode})
  }

  if (cart.products.length === 0 || !store) {
    return null;
  }
  return (
    <div className={homeStyles.container}>
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
      <Cart cart={cart} store={store} applyPromoCode={applyPromoCode} />
    </div>
  );
}
