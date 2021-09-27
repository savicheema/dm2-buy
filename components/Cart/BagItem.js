import { useState, useEffect } from "react";
import styles from "./bag-item.module.css";
import Image from "next/image";
import ImageButton from "../Buttons/ImageButton";

const BagItem = ({ item, removeProductFromCart, updateProductCount }) => {
  const [count, setCount] = useState(item.quantity || 1);

  const countEffect = () => {
    updateProductCount(item.id, count);
  };
  useEffect(countEffect, [count]);

  return (
    <div className={styles.orderItem}>
      <div className={styles.productDetails}>
        <img
          src={item.fields["header_photo"][0].url}
          height="60"
          width="60"
          alt="Order name"
          className={styles.orderThumbnail}
        />
        <div className={styles.productName}>
          <span>{item.fields.Name}</span>
          <div className={styles.quantityControls}>
            <ImageButton
              type="raised"
              action={() => {
                setCount(count - 1);
              }}
            >
              <Image src="/buttons/decrement@3x.png" width="9" height="2" />
            </ImageButton>
            <span>{count}</span>
            <ImageButton
              type="raised"
              action={() => {
                setCount(count + 1);
              }}
            >
              <Image src="/buttons/increment@3x.png" width="9" height="9" s />
            </ImageButton>
          </div>
        </div>
      </div>
      <div className={styles.details_right}>
        <div className={styles.productPrice}>
          {`${String.fromCharCode(0x20b9)}${count * item.fields.Price}`}
        </div>
        <img
          onClick={removeProductFromCart(item.id)}
          src="/invalid-name@2x.png"
        />
      </div>
    </div>
  );
};

export default BagItem;
