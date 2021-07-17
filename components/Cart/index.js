import React from "react";
import styles from "./cart.module.css";

import CartMessage from "./CartMessage";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import Order from "./Order";
import Footer from "../Footer";
import { serverEndpoint } from "../../services/helper";

const url = `${serverEndpoint}/order/`;

const Cart = ({ product, store }) => {
  const personalFormRef = React.createRef();
  const addressFormRef = React.createRef();
  const initiatePayment = async () => {
    const price = product.fields.Price + 100;
    const paymentProcessingFee = Number((price * 0.02).toFixed(2));
    const priceWithPaymentProcessingFee = price + paymentProcessingFee;
    const bodyData = {
      userId: "randomid",
      order_total: priceWithPaymentProcessingFee,
      buyer: personalFormRef.current.getValues(),
      address: addressFormRef.current.getValues(),
      seller: {
        seller_id: product?.fields?.Stores[0],
      },
      products: [
        {
          name: product?.fields?.Name,
          price: product.fields.Price,
        },
      ],
    };
    console.log(bodyData, "sss");
    const fetchData = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyData),
    });
    const res = await fetchData.json();
    if (res && res.status === "OK") {
      popUpFrame(res.paymentLink);
    } else {
      alert("Something went wrong");
    }
    console.log(res, "ressss");
  };

  const popUpFrame = (paymentLink) => {
    const popup = window.open(
      paymentLink,
      "newwindow",
      "height=600,width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, directories=no, status=no"
    );
    popup.onclose = () => {
      console.log("Pop up close");
    };
  };
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

          console.log(addressFormRef.current.getValues(), "values");
          console.log(personalFormRef.current.getValues(), "personal");
          initiatePayment();
          return false;
        }}
        product={product}
      />
      <Footer />
    </div>
  );
};

export default Cart;
