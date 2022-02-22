import Head from "next/head";
import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Main from "../components/Main";
import LoaderComponent from "../components/Loader";
import useLocalStorage from "../hooks/useLocalStorage";
import Error404 from "./404";
import { getStore } from "../services/backend/serverSideProps";
import Market from "../components/Market";

export async function getServerSideProps(context) {
  return getStore(context);
}

export default function Home(props) {
  const { storeData, errorCode, storeUrl, market, marketUrl, marketData } = props;
  const [store, setStore] = useLocalStorage("store", props.storeData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('marketData: ', marketData);
    setStore(props.storeData);
  }, []);

  if (errorCode) {
    return <Error404 statusCode={errorCode} />;
  }

  return (
    market
    ? <div className={styles.container}>
      <Head>
        <title>{marketData?.fields?.name}</title>
        <meta name="title" content={marketData?.fields?.name} />
        <meta name="description" content={marketData?.fields?.description} />
        <link rel="icon" href="/favicon.ico" />
        <link href="/fonts/fonts.css" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@700;900&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1,user-scalable=0"
        />

        <meta property="og:type" content="website" />
        <meta property="og:title" content={marketData?.fields?.name} />
        <meta
          property="og:description"
          content={marketData?.fields?.description}
        />
        <meta
          property="og:image"
          content={marketData?.fields?.heroImage[0]?.url}
        />
        <meta property="og:site_name" content="Dm 2 Buy" />
        <meta property="og:url" content={marketUrl} />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content={marketUrl} />
        <meta name="twitter:title" content={marketData?.fields?.name} />
        <meta
          property="twitter:description"
          content={marketData?.fields?.description}
        />
        <meta
          property="twitter:image"
          content={marketData?.fields?.heroImage[0]?.url}
        />
      </Head>
      {/* <Header store={store} /> */}
      {loading && <LoaderComponent />} 
      <Market
        market={marketData}
        loading={loading}
        endLoading={() => {
          setLoading(false);
        }}
      />
    </div>
    :  <div className={styles.container}>
        <Head>
          <title>{storeData?.fields?.store_name}</title>
          <meta name="title" content={storeData?.fields?.store_name} />
          <meta name="description" content={storeData?.fields?.store_bio} />
          <link rel="icon" href="/favicon.ico" />
          <link href="/fonts/fonts.css" rel="stylesheet" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@700;900&family=Roboto:wght@400;700&display=swap"
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
