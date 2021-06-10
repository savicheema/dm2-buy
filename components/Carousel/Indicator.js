import React from "react";
import styles from "./indicator.module.css";

const Indicator = ({ handler, isSelected }) => {
  console.log("INDICATOR", isSelected);
  if (isSelected) return <li className={styles.selectedIndicator}></li>;
  return <li className={styles.normalIndicator} onClick={handler}></li>;
};

export default Indicator;
