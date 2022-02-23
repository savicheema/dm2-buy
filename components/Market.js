import React, { useState, useEffect } from "react";
import styles from "./market.module.css";
import homeStyles from "../styles/Home.module.css";
import Image from "next/image";
import MarketShops from "./MarketShops";
import { ShareButton, ImageButton } from "./Buttons";
import EllipsisText from "react-ellipsis-text";
import MarketNavbar from "./MarketNavbar";
import useLocalStorage from "./../hooks/useLocalStorage";
import { CART_KEY } from "./../services/frontend/StorageKeys";
import { initialCart } from "./../services/ObjectsInitialValues";
import StorageManager from "./../services/frontend/StorageManager";

const Market = ({ market, endLoading, loading}) => {
  const homePageEnabled = market?.fields?.homePageEnabled;

  const updateHomeActive = (boolVal = false) => {
    setHomeActive(boolVal);
    if (typeof window !== 'undefined') {
      window.history.pushState("object or string", "Title", "shop");
    }
  }

  const handleShowCart = (boolVal = false) => {
    setShowCart(boolVal);
  }

  const showToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleRefresh = () => {
    setCart({
      products: [],
      shippingFee: 0,
      shippingFeeCap: 0
    });
  }

  if (!market) return null;

  console.log('===== market loaded ======');

  return (
    <main
      className={styles.market}
      style={{
        transition: "max-height 0.2s",
      }}
    >
        <MarketNavbar
            hideInAdvance={false}
            market={market}
            marketName={market?.fields?.name || ''}
        />
        {market.fields && (
            <MarketShops
                market={market}
                endLoading={endLoading}
                loading={true}
            />
        )}
    </main>
  );
};

export default Market;
