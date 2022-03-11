import React from "react";
import styles from "./prev-arrow.module.css";

const PrevArrow = ({ handler }) => {
  return (
    <div className={styles.buttonContainer}>
      <button onClick={handler} className={styles.prevButton}></button>
    </div>
  );
};

export default PrevArrow;
