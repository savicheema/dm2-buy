import { useState, useEffect } from "react";
import styles from "./bag-item.module.css";
import Image from "next/image";
import ImageButton from "../Buttons/ImageButton";

const BagItem = ({ item, removeProductFromCart, updateProductCount }) => {
  const [count, setCount] = useState(item.quantity || 1);
  const availableProductQuantity = item?.fields?.product_count
    ? parseInt(item?.fields?.product_count)
    : Number.MAX_SAFE_INTEGER;
  const isProductCustomised = item.customAttributes.length > 0;

  const countEffect = () => {
    updateProductCount(item.id, count);
  };
  useEffect(countEffect, [count]);

  return (
    <div className={styles.orderItem}>
      <div className={styles.productDetails}>
        <div className={styles.thumbnailContainer}>
          <Image
            src={item.fields["header_photo"][0].url}
            height={60}
            width={60}
            alt="Order name"
            className={styles.orderThumbnail}
          />

          {item.colour ? (
            <div
              className={styles.productColor}
              style={{ backgroundColor: item.colour }}
            ></div>
          ) : null}
        </div>
        <div className={styles.productName}>
          <span>{item.fields.Name}</span>
          {isProductCustomised && (
            <div className={styles.product_specs}>
              {item.customAttributes
                .map((ca) => (
                  <span>
                    {ca.name} - {ca.value + ""}
                  </span>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
            </div>
          )}
          {availableProductQuantity > 1 && !isProductCustomised && (
            <div className={styles.quantityControls}>
              <ImageButton
                type="raised"
                action={() => {
                  if (count < 2) return;
                  setCount(count - 1);
                }}
              >
                <Image src="/buttons/decrement@3x.png" width={9} height={2} />
              </ImageButton>
              <span>{count}</span>
              <ImageButton
                type="raised"
                action={() => {
                  if (count < availableProductQuantity) {
                    setCount(count + 1);
                  }
                }}
              >
                <Image src="/buttons/increment@3x.png" width={9} height={9} s />
              </ImageButton>
            </div>
          )}
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
