import React from "react";
import styles from "./store-item.module.css";

import Image from "next/image";

const StoreItem = ({ imgUrl }) => (
  <div className={styles.storeItem}>
    <div className="thumbnail">
      <Image src={imgUrl} width="152" height="204" />
    </div>

    <div className="details">
      <div className={styles.title}>Oversized Hoodie</div>
      <div className={styles.price}>$1400</div>
    </div>
  </div>
);

export default StoreItem;
