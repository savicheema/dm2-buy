import React, { useState, useEffect } from "react";
import styles from "./market-item.module.css";
import { environment } from "../services/helper";

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
        <img className={styles.shopImage} src={storeData?.coverImage[0]?.url} alt={storeData.store_name} />
        <div className={styles.infoSec}>
          <span className={styles.storeName}>
            {storeData.store_name}
            <img onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              window.location.href = `instagram://user?username=${storeData.store_instagram_handle}`
              return;
            }} className={styles.instagramLogo} src="/instagram-4@3x-black.png" width="23" />
          </span>
          {/* {
            storeData?.category && storeData?.category[0]
            ? <span className={styles.storeBio}>
              {storeData?.category[0]}
            </span>
            : ''
          } */}
          <span className={styles.storeBio} dangerouslySetInnerHTML={{ __html: storeData.store_bio }}>
          </span>
        </div>
      </div>
    </div>
  );
};

export default MarketItem;
