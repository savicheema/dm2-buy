import React, { useState, useEffect } from "react";
import styles from "./store-item.module.css";
import Image from "next/image";
import LinesEllipsis from "react-lines-ellipsis";

const ITEM_STATUS_LABELS = ["selling-fast", 'coming-soon', 'restocking-soon'];

const StoreItem = ({ product }) => {
  const getLabelText = (status, count) => {
    switch (status) {
      case 'selling-fast':
        return `LAST ${count} LEFT`;
      case 'coming-soon':
        return `COMING SOON`;
      case 'restocking-soon':
        return 'RESTOCKING SOON';
      default:
        return status.toUpperCase();
        break;
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
            {ITEM_STATUS_LABELS.includes(product.fields?.Status) ? 
              <span className={styles.itemStatusOverlay}>
                {getLabelText(product.fields?.Status, product.fields?.product_count)}
              </span>
            : null}
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
          {product.fields &&
            `${String.fromCharCode(0x20b9)}${product.fields.Price}`}
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
