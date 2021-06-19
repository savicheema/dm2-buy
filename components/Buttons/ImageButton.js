import React from "react";
import styles from "./image-button.module.css";

const ImageButton = ({ children, type, action }) => {
  return (
    <button
      className={styles[type]}
      onClick={action}
      style={{ minHeight: "20px", minWidth: "20px", display: "block" }}
    >
      {children}
    </button>
  );
};

export default ImageButton;
