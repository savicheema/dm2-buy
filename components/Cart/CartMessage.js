import React from "react";
import styles from "./cart-message.module.css";

const CartMessage = ({ message }) => (
  <div className={styles.cartMessage}>
    <div className={styles.heartEmoji}>❤️</div>
    <div className={styles.thankYou}>Thank you</div>
    <div className={styles.text}>{message}</div>
    {/* <div className={styles.seller}>
      <img
        src="/profile-pic.jpg"
        height="25"
        width="25"
        alt="mini profile pic"
        className={styles.miniAvatar}
      />
      <span>Neikimlhing (Kim)</span>
    </div> */}
  </div>
);

export default CartMessage;
