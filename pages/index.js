import Head from "next/head";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import Main from "../components/Main";
import LoaderComponent from "../components/Loader";
import useLocalStorage from "../hooks/useLocalStorage";
import Error404 from "./404";

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

export default function Home(props) {
  const { storeData, errorCode, storeUrl } = props;
  const [store, setStore] = useLocalStorage("store", props.storeData);
  const [loading, setLoading] = useState(true);

  if (errorCode) {
    return <Error404 statusCode={errorCode} />;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{storeData?.fields?.store_name}</title>
        <meta name="title" content={storeData?.fields?.store_name} />
        <meta name="description" content={storeData?.fields?.store_bio} />
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
        <meta property="og:title" content={storeData?.fields?.store_name} />
        <meta
          property="og:description"
          content={storeData?.fields?.store_bio}
        />
        <meta
          property="og:image"
          content={store?.fields?.store_profile_photo[0]?.url}
        />
        <meta property="og:site_name" content="Dm 2 Buy" />
        <meta property="og:url" content={storeUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={storeUrl} />
        <meta name="twitter:title" content={storeData?.fields?.store_name} />
        <meta
          property="twitter:description"
          content={storeData?.fields?.store_bio}
        />
        <meta
          property="twitter:image"
          content={store?.fields?.store_profile_photo[0]?.url}
        />
      </Head>

      {/* <Header store={store} /> */}
      {loading && <LoaderComponent />}
      <Main
        store={store}
        loading={loading}
        endLoading={() => {
          setLoading(false);
        }}
      />
    </div>
  );
}
