import React, { useState, useEffect } from "react";
import styles from "./store-item.module.css";

import Image from "next/image";

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

  if (!product) return "";
  return (
    <div className={styles.storeItem}>
      <div className="thumbnail">
        {product.fields && (
          <img
            src={product.fields["Other photos"][0].url}
            width="152"
            height="204"
            alt="store product"
          />
        )}
      </div>

      <div className="details">
        <div className={styles.title}>
          {product.fields && `${product.fields.Name}`}
        </div>
        <div className={styles.price}>
          {product.fields && `${product.fields.Price}`}
        </div>
      </div>
    </div>
  );
};

export default StoreItem;
