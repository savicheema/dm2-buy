import React from "react";
import styles from "./order.module.css";
import { getPrice } from "../../services/frontend/pricing.service";

import OrderItem from "./OrderItem";

export default function Order({ cart, checkInputs }) {
  const {
    shippingFee,
    productTotalPrice: price,
    actualShippingFee,
    total: priceWithPaymentProcessingFee,
    paymentProcessingFee,
    shippingFeeApplied,
  } = getPrice(cart);

  return (
    <>
      <div className={styles.order}>
        <h2 className={styles.orderTitle}>
          <span>📦</span> Your Order
        </h2>
        <div className={styles.orderList}>
          {cart.products.map((product, index) => (
            <OrderItem item={product} key={index} />
          ))}
        </div>
        <div className={styles.charges}>
          <div className={styles.orderItem}>
            <div className={styles.productDetails}>
              <span className={styles.shippingEmoji}>🚛</span>

              <div className={styles.productName}>
                Shipping Fee <br />{" "}
                {!shippingFeeApplied && (
                  <div className={styles.free_shipping}>
                    You saved {actualShippingFee}! 🙌
                  </div>
                )}
              </div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${shippingFee}`}
            </div>
          </div>

          <div className={styles.orderItem}>
            <div className={styles.productDetails}>
              <span className={styles.shippingEmoji}>💳</span>
              <div className={styles.productName} style={{ width: "8rem" }}>
                Payment Processing Fee
              </div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${paymentProcessingFee}`}
            </div>
          </div>
        </div>
      </div>
      <button
        className={styles.orderButton}
        onClick={async () => {
          const isFormValid = await checkInputs();
          if (isFormValid) {
            localStorage.removeItem("product");
          }
        }}
      >
        {`Pay — ${String.fromCharCode(0x20b9) + priceWithPaymentProcessingFee}`}
      </button>
    </>
  );
}
