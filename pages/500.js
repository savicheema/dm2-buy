import React from "react";
import styles from "../styles/Home.module.css";

const reload = () => {
  window.location.reload();
};

const Error500Page = () => (
  <div className={styles.container}>
    <img src="/500.png" className={styles.title404} alt="500 image"></img>
    <p className={styles.notFoundMessage}>
      We are over capacity! Please wait a moment and try again.
    </p>
    <div onClick={reload} className={styles.notFoundHeadHome}>
      Refresh
    </div>
  </div>
);

export default Error500Page;
