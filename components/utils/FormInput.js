import React from "react";
import styles from "./form-input.module.css";

const FormInput = ({ type, placeholder, value }) => {
  const formInputClass = type === "full" ? styles.formInput : styles.halfInput;
  return (
    <div className={formInputClass}>
      <div className={styles.error}>We need your name</div>
      <input
        className={styles.inputClass}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

export default FormInput;
