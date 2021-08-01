import React, { useEffect } from "react";
import homeStyles from "../../styles/Home.module.css";
import Head from "next/head";
import Cart from "../../components/Cart";
import useLocalStorage from "../../hooks/useLocalStorage";

export async function getServerSideProps(context) {
  let store, errorCode, storeUrl;
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
    storeUrl = `${hostWithProtocol}/`;
    errorCode = false;
  } catch (e) {
    errorCode = 404;
    storeUrl = "";
  }
  return {
    props: { storeData: store || null, errorCode, storeUrl }, // will be passed to the page component as props
  };
}

export default function CartPage(props) {
  const [storedProduct, setStoredProduct] = useLocalStorage("product", null);
  const [store, setStore] = useLocalStorage("store", props.storeData);

  useEffect(() => {
    console.log();
    if (!storedProduct || !store.fields) {
      window.location.href = "/";
    }
  });
  if (!storedProduct || !store) {
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
      <Cart product={storedProduct} store={store} />
    </div>
  );
}
