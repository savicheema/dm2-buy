import React, { useState, useEffect } from "react";
import styles from "./store-item.module.css";

import Image from "next/image";

import LinesEllipsis from "react-lines-ellipsis";

const StoreItem = ({ product }) => {
  const getProductPrice = (price, mrp='') => {
    if(!price) return;
    if(mrp) {
      let strikeOutMRP = <span className={styles.strikeOutText}>{`${String.fromCharCode(0x20b9)}${mrp}`}</span>;
      return <>{`${String.fromCharCode(0x20b9)}${price}`} {strikeOutMRP}</>;
    } else {
      return `${String.fromCharCode(0x20b9)}${product.price}`
    }
  }
  if (!product) return "";

  const checkStock = (product) => {
    let stockAvailable = false;
    if (product.variantPrice && product.variantPrice.length) {
      product.variantPrice.forEach(variant => {
        if (variant?.stockAvailable > 0) {
          stockAvailable = true;
        }
      });
    }
    return stockAvailable;
  }

  return (
    <div
      className={styles.storeItem}
      onClick={() => {
        window.location.href = `/product/${product.id}`;
      }}
    >
      <div className={styles.thumbnail}>
        {product && product?.productPhotos[0] && (
          <div className={styles.image_container}>
            {!checkStock(product) && (
              <div className={styles.item_overlay}>
                <p>SOLD</p>
              </div>
            )}
            <Image
              className={styles.productImg}
              src={`${product?.productPhotos[0]}`}
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
          {product && (
            <LinesEllipsis
              text={`${product.name}`}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          )}
        </div>
        <div className={styles.price}>
          {product && getProductPrice(product.price, product.mrp)}
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
