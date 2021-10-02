import { useState, useEffect } from "react";
import styles from "./order-item.module.css";

const OrderItem = ({ item }) => (
  <div className={styles.orderProduct}>
    <div className={styles.productDetails}>
      <div className={styles.productAvatar}>
        <img
          src={item.fields["header_photo"][0].url}
          height="60"
          width="60"
          alt="Order name"
          className={styles.orderThumbnail}
        />
        <span className={styles.productQuantity}>{item.quantity}</span>
      </div>

      <div className={styles.productName}>{item.fields.Name}</div>
    </div>
    <div className={styles.productPrice}>
      {`${String.fromCharCode(0x20b9)}${item.quantity * item.fields.Price}`}
    </div>
  </div>
);

export default OrderItem;