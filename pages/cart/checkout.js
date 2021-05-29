import React from "react";
import styles from "./cart-page.module.css";
import homeStyles from "../../styles/Home.module.css";

import Head from "next/head";
import Header from "../../components/Header";
import Cart from "../../components/Cart";

const CartPage = () => (
  <div className={homeStyles.container}>
    <Head>
      <title>DM 2 BUY</title>
      <meta name="description" content="Take your side hustle to next level." />
      <link rel="icon" href="/favicon.ico" />
      <link href="/fonts/fonts.css" rel="stylesheet" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Martel+Sans:wght@900&display=swap"
        rel="stylesheet"
      />
    </Head>

    <Header />

    <Cart />
  </div>
);

export default CartPage;
