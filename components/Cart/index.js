import React from "react";
import styles from "./cart.module.css";

import CartMessage from "./CartMessage";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import Order from "./Order";

const Cart = () => (
  <div className={styles.cart}>
    <CartMessage />

    <PersonalForm />

    <AddressForm />

    <Order />
  </div>
);

export default Cart;
