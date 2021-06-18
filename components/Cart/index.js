import React from "react";
import styles from "./cart.module.css";

import CartMessage from "./CartMessage";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import Order from "./Order";
import Footer from "../Footer";

const Cart = ({ product }) => {
  const personalFormRef = React.createRef();
  const addressFormRef = React.createRef();

  return (
    <div className={styles.cart}>
      <CartMessage />

      <PersonalForm ref={personalFormRef} />

      <AddressForm ref={addressFormRef} />

      <Order
        checkInputs={() => {
          const isPersonalFormValid = personalFormRef.current.validate();
          const isAddreessFormValid = addressFormRef.current.validate();

          if (!isPersonalFormValid) {
            personalFormRef.current.focus();
            return false;
          }

          if (!isAddreessFormValid) {
            addressFormRef.current.focus();
            return false;
          }

          return isPersonalFormValid && isAddreessFormValid;
        }}
        product={product}
      />
      <Footer />
    </div>
  );
};

export default Cart;
