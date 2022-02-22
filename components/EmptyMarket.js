import React from "react";
import styles from "./empty-store.module.css";

import Image from "next/image";

const EmptyMarket = () => (
  <div className={styles.emptyStore}>
    <Image
      className={styles.emptyBox}
      src="/empty-box.webp"
      width="96"
      height="96"
    />
    <h3 className={styles.emptyStoreMessage}>No stores listed</h3>
  </div>
);

export default EmptyMarket;
