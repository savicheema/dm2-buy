import React from "react";
import styles from "./order.module.css";
import constants from "../../constants"
import NoticeConditions from "../NoticeConditions";

class Order extends React.Component {
  render() {
    // let { isFetched } = this.state;
    let { product } = this.props;

    const price = product.fields.Price + constants.regularDeliveryFee;
    const paymentProcessingFee = Number((price * 0.02).toFixed(2));
    const priceWithPaymentProcessingFee = price + paymentProcessingFee;

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
                height="60"
                width="60"
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

              <div className={styles.productName}>Shipping Fee</div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${constants.regularDeliveryFee}`}
            </div>
          </div>

          <div className={styles.orderItem}>
            <div className={styles.productDetails}>
              <span className={styles.shippingEmoji}>💳</span>

              <div className={styles.productName}>Payment Processing Fee</div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${paymentProcessingFee}`}
            </div>
          </div>
          <br/>
          <hr/>
        </div>

        <button
          className={styles.orderButton}
          onClick={async () => {
            const isFormValid = await this.props.checkInputs();
            if (isFormValid) {
              localStorage.removeItem("product");
            }
          }}
        >
          {`Pay ${String.fromCharCode(0x20b9) + priceWithPaymentProcessingFee}`}
        </button>
        {/* <NoticeConditions /> */}
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
