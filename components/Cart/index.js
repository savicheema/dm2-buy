import React from "react";
import styles from "./cart.module.css";

import CartMessage from "./CartMessage";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import Order from "./Order";
import Footer from "../Footer";

const Cart = ({ product, store }) => {
  const personalFormRef = React.createRef();
  const addressFormRef = React.createRef();

  return (
    <div className={styles.cart}>
      <CartMessage message={store.fields?.thank_you_note} />

      <PersonalForm ref={personalFormRef} />

      <AddressForm ref={addressFormRef} />

      <Order
        checkInputs={async () => {
          const isPersonalFormValid = await personalFormRef.current.validate();
          if (!isPersonalFormValid) return isPersonalFormValid;

          const isAddressFormValid = await addressFormRef.current.validate();
          if (!isAddressFormValid) return isAddressFormValid;

          return false;
        }}
        product={product}
      />
      <Footer />
    </div>
  );
};

export default Cart;
