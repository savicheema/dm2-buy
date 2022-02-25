import React, { useState, useEffect } from "react";
import styles from "./market-item.module.css";

const MarketItem = ({ store }) => {
  const storeData = store.fields;

  return (
    <div
      className={styles.marketItem}
      onClick={() => {
        window.location.href = `https://${storeData['subdomain ']}.dev.dm2buy.com`;
      }}
    >
      <div className={styles.shopContainer}>
        <img className={styles.shopImage} src={storeData?.store_profile_photo[0]?.url} alt={storeData.store_name} />
        <div className={styles.infoSec}>
          <span className={styles.storeName}>
            {storeData.store_name}
          </span>
          <span className={styles.storeBio} dangerouslySetInnerHTML={{ __html: storeData.store_bio }}>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketItem;
