import React from "react";
import styles from "./span.module.css";

const Span = ({ children }) => <span className={styles.bold}>{children}</span>;

export default Span;
