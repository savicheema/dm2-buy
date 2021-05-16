import React, { useState, useEffect } from "react";
import styles from "./store-item.module.css";

import Image from "next/image";

import LinesEllipsis from "react-lines-ellipsis";

const StoreItem = ({ productId }) => {
  const [product, setproduct] = useState({});

  const fetchproduct = () => {
    console.log("ENV", process, process.env);

    fetch(`/api/airtable/getProduct?product=${productId}`)
      .then((response) => {
        console.log("product RESPONSE", response);
        return response.json();
      })
      .then((data) => {
        console.log("product DATA", data);
        setproduct(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  if (!product.fields || product.fields.Status != "for-sale") return "";
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
