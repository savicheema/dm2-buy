import Head from "next/head";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import Main from "../components/Main";

export default function Home() {
  const [store, setStore] = useState({});

  const fetchStore = () => {
    console.log("ENV", process, process.env);
    const store = "recvPq1aVPifDwUAY";

    const url = new URL(
      `${window.location.protocol}//${window.location.host}/api/airtable/getRecord`
    );
    url.searchParams.set("store", store);
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
      });
  };

  useEffect(() => {
    fetchStore();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>DM 2 BUY</title>
        <meta
          name="description"
          content="Take your side hustle to next level."
        />
        <link rel="icon" href="/favicon.ico" />
        <link href="/fonts/fonts.css" rel="stylesheet" />
      </Head>

      <Header store={store} />

      <Main store={store} />
    </div>
  );
}
