import React from "react";
import styles from "./cart-page.module.css";
import homeStyles from "../../styles/Home.module.css";

import Head from "next/head";
import Header from "../../components/Header";
import Cart from "../../components/Cart";
import Footer from "../../components/Footer";

class CartPage extends React.Component {
  render() {
    let { storedProduct } = this.state;
    console.log(" CartPage STATE", storedProduct);
    if (!storedProduct) return null;

    return (
      <div className={homeStyles.container}>
        <Head>
          <title>DM 2 BUY</title>
          <meta
            name="description"
            content="Take your side hustle to next level."
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
        </Head>
        <Cart product={storedProduct} />
        <Footer />
      </div>
    );
  }

  constructor(props) {
    super(props);

    let storedProduct = null;

    this.state = { storedProduct };
  }

  componentDidMount() {
    const product = JSON.parse(localStorage.getItem("product"));
    this.setState({ storedProduct: product }, () => {
      let { storedProduct } = this.state;
      if (!storedProduct) window.location.href = "/404";
    });
  }
  componentWillUnmount() {}
}

export default CartPage;
