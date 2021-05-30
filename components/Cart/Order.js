import React from "react";
import styles from "./order.module.css";

import NoticeConditions from "../NoticeConditions";

class Order extends React.Component {
  render() {
    // let { isFetched } = this.state;
    let { product } = this.props;

    const price = product.fields.Price + 100;
    // console.log(" Order STATE", isFetched, product);

    return (
      <div className={styles.order}>
        <h2 className={styles.orderTitle}>
          <span>📦</span> Your Order
        </h2>

        <div className={styles.orderList}>
          <div className={styles.orderItem}>
            <div className={styles.productDetails}>
              <img
                src={product.fields["header photo"][0].url}
                height="80"
                width="80"
                alt="Order name"
                className={styles.orderThumbnail}
              />

              <div className={styles.productName}>{product.fields.Name}</div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${product.fields.Price}`}
            </div>
          </div>

          <div className={styles.orderItem}>
            <div className={styles.productDetails}>
              <span className={styles.shippingEmoji}>🚛</span>

              <div className={styles.productName}>Regular Delivery</div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}100`}
            </div>
          </div>
        </div>

        <button
          className={styles.orderButton}
          onClick={() => {
            if (this.props.checkInputs()) localStorage.removeItem("product");
          }}
        >
          {`Proceed to Pay - ${price}`}
        </button>
        <NoticeConditions />
      </div>
    );
  }

  constructor(props) {
    super(props);

    let isFetched = false;

    this.state = { isFetched };
  }

  componentDidMount() {
    // const urlParams = new URLSearchParams(window.location.search);
    // const productId = urlParams.get("product");
    //
    // if (!productId) console.error("Product ID not available");
    // this.fetchProduct(productId)
    //   .then((product) => {
    //     // console.log("Do something", product);
    //     // product.allPhotos = product.fields["header photo"].concat(
    //     //   product.fields["Other photos"]
    //     // );
    //     this.setState({ isFetched: true, product });
    //   })
    //   .catch(() => {
    //     console.error("Do nothing!");
    //   });
  }
  componentWillUnmount() {}

  // fetchProduct = (productId) => {
  //   return new Promise((resolve, reject) => {
  //     fetch(`/api/airtable/getProduct?product=${productId}`)
  //       .then((response) => {
  //         console.log("product RESPONSE", response);
  //         return response.json();
  //       })
  //       .then((data) => {
  //         console.log("product DATA", data);
  //         resolve(data);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //         reject();
  //       });
  //   });
  // };
}

export default Order;
