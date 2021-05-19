import React from "react";
import styles from "./product.module.css";

import { ShareButton } from "../../components/Buttons";

class Product extends React.Component {
  render() {
    let { isFetched, product } = this.state;
    console.log(" Product STATE", isFetched);

    if (!product) return null;

    return (
      <div className={styles.product}>
        <div className={styles.productHead}>
          <h1 className={styles.productHeading}>{product.fields.Name}</h1>
          <ShareButton />
        </div>
        <div className={styles.price}>
          {product.fields &&
            `${String.fromCharCode(0x20b9)}${product.fields.Price}`}
        </div>
        <div className={styles.callToAction}>
          {product.fields.Status === "for-sale" && (
            <button className={styles.buyNowButton}>Buy Now</button>
          )}
          {product.fields.Status !== "for-sale" && (
            <button className={styles.soldOutButton}>Sold Out</button>
          )}
        </div>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: product.fields.description }}
        ></p>
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isFetched = false;
    let product = undefined;

    this.state = { isFetched, product };
  }

  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("productId");

    if (!productId) console.error("Product ID not available");
    this.fetchProduct(productId)
      .then((product) => {
        console.log("Do something");
        this.setState({ isFetched: true, product });
      })
      .catch(() => {
        console.error("Do nothing!");
      });
  }

  componentWillUnmount() {}

  fetchProduct = (productId) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/airtable/getProduct?product=${productId}`)
        .then((response) => {
          console.log("product RESPONSE", response);
          return response.json();
        })
        .then((data) => {
          console.log("product DATA", data);
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject();
        });
    });
  };
}

export default Product;
