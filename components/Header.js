import React from "react";
import styles from "./header.module.css";
import Image from "next/image";

import Span from "./Span";
import ImageButton from "./ImageButton";

const Header = () => (
  <header className={styles.header}>
    <div className={styles.notice}>
      <Span>30%</Span> of all sales from <Span>Kim's store</Span> will be
      donated to <Span>Give India</Span> as a part of{" "}
      <Span>COVID-19 Relief Fundraiser</Span>{" "}
    </div>
    <div className={styles.siteHeader}>
      <img
        src="/logo.png"
        srcset="/logo@2x.png 2x, /logo@3x.png 3x"
        className={styles.logo}
        alt="logo"
      />
      <ImageButton type="flat" action={() => {}}>
        <Image src="/shopping-bag.png" width="24" height="28" />
      </ImageButton>
    </div>
  </header>
);

export default Header;
