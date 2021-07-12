import Head from "next/head";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Main from "../components/Main";
import LoaderComponent from "../components/Loader";
import { getSubDomainOfPage } from "../services/helper";
import useLocalStorage from "../hooks/useLocalStorage";

export default function Home() {
  const [store, setStore] = useLocalStorage("store", {});
  const [loading, setLoading] = useState(false);
  const [meta, setMeta] = useState({
    title: "Dm 2 Buy",
  });

  const fetchStore = async () => {
    const url = new URL(
      `${window.location.protocol}//${window.location.host}/api/airtable/getRecord`
    );
    const subdomain = getSubDomainOfPage();
    url.searchParams.set("subdomain", subdomain);
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Store not found!");
      }
      const data = await response.json();
      setStore(data);
      setMeta({ ...meta, title: data.fields.store_name });
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchStore()
      .catch((e) => {
        console.log("error in index fetch", { e });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.container}>
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
