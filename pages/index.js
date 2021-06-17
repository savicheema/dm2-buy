import Head from "next/head";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import LoaderComponent from "../components/Loader";

export default function Home() {
  const [store, setStore] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchStore = () => {
    console.log("ENV", process, process.env);
    const store = "recvPq1aVPifDwUAY";

    const url = new URL(
      `${window.location.protocol}//${window.location.host}/api/airtable/getRecord`
    );
    url.searchParams.set("store", store);
    setLoading(true);
    fetch(url)
      .then((response) => {
        console.log("STORE RESPONSE", response);
        return response.json();
      })
      .then((data) => {
        console.log("STORE DATA", data);
        setStore(data);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        alert("Error fetching store!");
      });
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kim's Shop</title>
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
        <meta property="og:title" content="Kim's Shop" />
        <meta
          property="og:description"
          content="Check my shop out and bag my latest drop"
        />
        <meta property="og:image" content="/favicon.ico" />
      </Head>

      {/* <Header store={store} /> */}
      {loading && <LoaderComponent />}

      <Main
        store={store}
        endLoading={() => {
          setLoading(false);
        }}
      />
      <Footer />
    </div>
  );
}
