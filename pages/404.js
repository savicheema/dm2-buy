import React from "react";
import styles from "../styles/Home.module.css";

const NotFound = () => (
  <div className={styles.container}>
    <img src="/404.png" className={styles.title404} alt="404 image"></img>
    <p className={styles.notFoundMessage}>
      The page you are looking for does not exist. <br /> Sorry :(
    </p>
    <a href="/" className={styles.notFoundHeadHome}>
      Head home
    </a>
  </div>
);

export default NotFound;
