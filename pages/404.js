import React from "react";
import styles from "../styles/Home.module.css";

const NotFound = () => (
  <div className={styles.notFound}>
    <h1>404 Not Found</h1>
    <p>Page you are looking for does not exist</p>
    <a href="/" className={styles.link}>
      Go to Home page
    </a>
  </div>
);

export default NotFound;
