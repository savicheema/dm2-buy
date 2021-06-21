import React from "react";
import styles from "./input-loader.module.css";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const InputLoader = () => (
  <div className={styles.inputLoader}>
    <Loader
      type="ThreeDots"
      color="#000000"
      height={16}
      width={16}
      timeout={5000} //3 secs
    />
  </div>
);

export default InputLoader;
