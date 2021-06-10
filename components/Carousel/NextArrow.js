import React from "react";
import styles from "./next-arrow.module.css";

const NextArrow = ({ handler }) => {
  console.log("ARROW PROPS", handler);
  return (
    <div className={styles.buttonContainer}>
      <button onClick={handler} className={styles.nextButton}></button>
    </div>
  );
};

export default NextArrow;
