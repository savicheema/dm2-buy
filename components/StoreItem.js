import React, { useState, useEffect } from "react";
import styles from "./store-item.module.css";

import Image from "next/image";

import LinesEllipsis from "react-lines-ellipsis";

const StoreItem = ({ product }) => {
  if (!product.fields) return "";
  return (
    <div className={styles.storeItem}>
      <div className="thumbnail">
        {product.fields && product.fields["Other photos"][0].url && (
          <Image
            src={`${product.fields["Other photos"][0].url}`}
            width="152"
            height="204"
            alt="store product"
          />
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
