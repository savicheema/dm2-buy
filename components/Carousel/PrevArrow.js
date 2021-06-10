import React from "react";
import styles from "./prev-arrow.module.css";

const PrevArrow = ({ handler }) => {
  console.log("ARROW PROPS", handler);
  return (
    <div className={styles.buttonContainer}>
      <button onClick={handler} className={styles.prevButton}></button>
    </div>
  );
};

export default PrevArrow;
