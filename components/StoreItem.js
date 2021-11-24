import React, { useState, useEffect } from "react";
import styles from "./store-item.module.css";

import Image from "next/image";

import LinesEllipsis from "react-lines-ellipsis";

const StoreItem = ({ product }) => {
  const getProductPrice = (price, discountedPrice='') => {
    if(!price) return;
    if(discountedPrice) {
      let strikeOutPrice = <span className={styles.strikeOutText}>{`${String.fromCharCode(0x20b9)}${price}`}</span>;
      return <>{`${String.fromCharCode(0x20b9)}${discountedPrice}`} {strikeOutPrice}</>;
    } else {
      return `${String.fromCharCode(0x20b9)}${product.fields.Price}`
    }
  }
  if (!product.fields) return "";
  return (
    <div
      className={styles.storeItem}
      onClick={() => {
        window.location.href = `/product/${product.fields.Slug}-${product.id}`;
      }}
    >
      <div className={styles.thumbnail}>
        {product.fields && product.fields?.header_photo?.[0].url && (
          <div className={styles.image_container}>
            {product.fields?.product_count === 0 && (
              <div className={styles.item_overlay}>
                <p>SOLD</p>
              </div>
            )}
            <Image
              className={styles.productImg}
              src={`${product?.fields?.header_photo?.[0].url}`}
              width={204}
              height={204}
              objectFit="cover"
              alt="store product"
              priority
            />
          </div>
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.title}>
          {product.fields && (
            <LinesEllipsis
              text={`${product.fields.Name}`}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          )}
        </div>
        <div className={styles.price}>
          {product.fields && getProductPrice(product.fields.Price, product.fields['discounted price'])}
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
