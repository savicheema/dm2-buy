import React from "react";
import styles from "./order.module.css";

import NoticeConditions from "../NoticeConditions";

const Order = () => (
  <div className={styles.order}>
    <h2>📦 Your Order</h2>

    <div className={styles.orderList}>
      <div className={styles.orderItem}>
        <img
          src="/sweatshirt/bitmap.png"
          height="136"
          width="136"
          alt="Order name"
        />
        <span>Portal 2 Portal Raincoat</span>
      </div>

      <div className={styles.orderItem}>
        <span className={styles.shippingEmoji}>🚛</span>
        <span>Portal 2 Portal Raincoat</span>
      </div>
    </div>

    <NoticeConditions />

    <button className={styles.orderButton}>Proceed to Pay - 2100</button>
  </div>
);

export default Order;
