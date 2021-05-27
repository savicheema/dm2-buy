import React, { useState, useEffect } from "react";
import styles from "./header.module.css";
import Image from "next/image";

import Span from "./Span";
import { ImageButton } from "./Buttons";

const Header = ({ store }) => {
  return (
    <header className={styles.header}>
      {/*
      <div className={styles.notice}>
        <Span>
          {store.fields && `${store.fields.store_charity_percentage}`}
        </Span>{" "}
        of all sales from{" "}
        <Span>{store.fields && `${store.fields.store_name}`}</Span> will be
        donated to{" "}
        <Span>{store.fields && `${store.fields.store_charity_name}`}</Span> as a
        part of <Span>COVID-19 Relief Fundraiser</Span>{" "}
      </div>
      */}

      <div className={styles.siteHeader}>
      dm2buy
        {/* <img src="/logo.png" className={styles.logo} alt="logo" /> */}
        {/*
          <ImageButton type="flat" action={() => {}}>
          <Image src="/shopping-bag.png" width="24" height="28" />
        </ImageButton>
          */}
      </div>
    </header>
  );
};

export default Header;
