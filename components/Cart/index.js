import React from "react";
import styles from "./cart.module.css";

import CartMessage from "./CartMessage";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import Order from "./Order";

const Cart = () => {
  const personalFormRef = React.createRef();
  const addressFormRef = React.createRef();

  return (
    <div className={styles.cart}>
      <CartMessage />

      <PersonalForm ref={personalFormRef} />

      <AddressForm ref={addressFormRef} />

      <Order
        checkInputs={() => {
          personalFormRef.current.validate();
          addressFormRef.current.validate();
        }}
      />
    </div>
  );
};

export default Cart;
