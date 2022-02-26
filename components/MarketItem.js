import React, { useState, useEffect } from "react";
import styles from "./market-item.module.css";
import { environment } from "../services/helper";

const MarketItem = ({ store }) => {
  const storeData = store.fields;
  console.log('storeData: ', storeData);
  return (
    <div
      className={styles.marketItem}
      onClick={() => {
        const endpoint = environment === 'PROD' ? '' : '.dev';
        window.location.href = `https://${storeData['subdomain ']}${endpoint}.dm2buy.com`;
      }}
    >
      <div className={styles.shopContainer}>
        <img className={styles.shopImage} src={storeData?.store_profile_photo[0]?.url} alt={storeData.store_name} />
        <div className={styles.infoSec}>
          <span className={styles.storeName}>
            {storeData.store_name}
          </span>
          {
            storeData?.category && storeData?.category[0]
            ? <span className={styles.storeBio}>
              {storeData?.category[0]}
            </span>
            : ''
          }
          {/* <span className={styles.storeBio} dangerouslySetInnerHTML={{ __html: storeData.store_bio }}>
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default MarketItem;
