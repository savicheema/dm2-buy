import React from "react";
import styles from "./order.module.css";
import { getPrice } from "../../services/frontend/pricing.service";

import OrderItem from "./OrderItem";
import GiftCode from "./GiftCode";

export default function Order({ cart, checkInputs }) {
  const {
    shippingFee,
    productTotalPrice: price,
    actualShippingFee,
    total: priceWithPaymentProcessingFee,
    paymentProcessingFee,
    shippingFeeApplied
  } = getPrice(cart);

  return (
    <>
      <div className={styles.order}>
        <div className={styles.orderBox}>
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
                  <div className={styles.productName}>
                    Shipping Fee <br />{" "}
                    {actualShippingFee && !shippingFeeApplied ? (
                      <div className={styles.free_shipping}>
                        You saved
                        {` ${String.fromCharCode(0x20b9)}${actualShippingFee}`}! 🙌
                      </div>
                    ): null}
                  </div>
                </div>
                <div className={styles.productPrice}>
                  {`${String.fromCharCode(0x20b9)}${shippingFee}`}
                </div>
              </div>
            <div className={styles.orderItem}>
              <div className={styles.productDetails}>
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
        <GiftCode />
        <button
          className={styles.orderButton}
          onClick={async () => {
            const isFormValid = await checkInputs();
            if (isFormValid) {
              localStorage.removeItem("product");
            }
          }}
        >
          <span>
            Proceed to Pay
          </span>
          <span>
            {String.fromCharCode(0x20b9) + priceWithPaymentProcessingFee}
          </span>
        </button>
      </div>
    </>
  );
}
