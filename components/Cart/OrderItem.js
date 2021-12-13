import { useState, useEffect } from "react";
import styles from "./order-item.module.css";

const OrderItem = ({ item }) => (
  <div className={styles.orderProduct}>
    <div className={styles.productDetails}>
      <div className={styles.productAvatar}>
      </div>

      <div className={styles.productName}>
        {item.fields.Name} {' x '} {item.quantity}
        { item.colour ? (
          <span
            className={styles.productQuantity}
            style={{ backgroundColor: item.colour }}
          ></span>
        ) : null}

        {item.customAttributes.length > 0 && (
          <div className={styles.product_specs}>
            {item.customAttributes
              .map((ca) => (
                <span>
                  {ca.name} - {ca.value}
                </span>
              ))
              .reduce((prev, curr) => [prev, ", ", curr])}
          </div>
        )}
      </div>
    </div>
    <div className={styles.productPrice}>
      {`${String.fromCharCode(0x20b9)}${item.quantity * item.fields.Price}`}
    </div>
  </div>
);

export default OrderItem;
