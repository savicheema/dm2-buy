import { useState, useEffect } from "react";
import styles from "./bag-item.module.css";
import Image from "next/image";
import ImageButton from "../Buttons/ImageButton";

const BagItem = ({ item, removeProductFromCart, updateProductCount }) => {
  const [count, setCount] = useState(item.quantity || 1);
  const availableProductQuantity = item?.productCount
    ? parseInt(item?.productCount)
    : Number.MAX_SAFE_INTEGER;
  const isProductCustomised = item.customAttributes.length > 0;

  const countEffect = () => {
    updateProductCount(item.id, count);
  };
  useEffect(countEffect, [count]);

  console.log('item: ', item);
  if (item?.otherPhotos?.length) {
    localStorage.clear();
    console.log('1123123112312312');
    // window.location.reload();
    // console.log('cleared the local storage.');
  }

  return (
    <div className={styles.orderItem}>
      <div className={styles.productDetails}>
        <div className={styles.thumbnailContainer}>
          <Image
            src={item?.productPhotos[0]}
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
          <span>{item.name}</span>
          {isProductCustomised && (
            <div className={styles.product_specs}>
              {item.customAttributes
                .map((ca, index) => (
                  <span key={index + 1}>
                    {ca.name} - {ca.value + ""}
                  </span>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
            </div>
          )}
          <div className={styles.product_specs}>
            {
              item.size
                ? 'Size - ' + item.size : ''
            }
          </div>
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
          {`${String.fromCharCode(0x20b9)}${count * item.price}`}
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
