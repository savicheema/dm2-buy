import React from "react";
import styles from "./loader.module.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const LoaderComponent = () => (
  <div className={styles.loader}>
    <Loader
      type="Oval"
      color="#ccc"
      height={40}
      width={40}
      timeout={3000} //3 secs
    />
  </div>
);

export default LoaderComponent;
