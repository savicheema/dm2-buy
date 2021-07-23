import React from "react";
import styles from "../styles/Home.module.css";

const NotFound = () => (
  <div className={styles.container}>
    <h1 style={{fontSize: '4rem'}}>404</h1>
    <p className={styles.notFoundMessage}>The page you are looking for does not exist. <br/> Sorry :(</p>
    <a href="/" className={styles.notFoundHeadHome}>
      Head home
    </a>
  </div>
);

export default NotFound;
