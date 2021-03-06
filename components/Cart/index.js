import React, { useState } from "react";
import styles from "./cart.module.css";

import CartMessage from "./CartMessage";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import Order from "./Order";
import Footer from "../Footer";
import { guid, getSubDomainOfPage } from "../../services/helper";
import Toast from "../Toast";
import constants from "../../constants";
import LoaderComponent from "../Loader";

const Cart = ({ product, store }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const personalFormRef = React.createRef();
  const addressFormRef = React.createRef();
  const showError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 3000);
  };
  const initiatePayment = async () => {
    const price = product.fields.Price + 0; //making fee 0 for testing
    const paymentProcessingFee = Number((price * 0.02).toFixed(2));
    const priceWithPaymentProcessingFee = price + paymentProcessingFee;
    setError(false);
    const bodyData = {
      userId: guid(),
      order_shipping: constants.regularDeliveryFee,
      order_total: priceWithPaymentProcessingFee,
      buyer: personalFormRef.current.getValues(),
      address: addressFormRef.current.getValues(),
      seller: {
        name: getSubDomainOfPage(),
        instagram: store?.fields?.store_instagram_handle,
        phone: store?.fields?.phone,
        seller_id: product?.fields?.Stores[0],
      },
      products: [
        {
          id: product?.id,
          name: product?.fields?.Name,
          price: product.fields.Price,
        },
      ],
    };
    setLoading(true);
    const url = new URL(
      `${window.location.protocol}//${window.location.host}/api/order/create`
    );
    try {
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
        showError();
        setLoading(false);
      }
    } catch (e) {
      showError();
      setLoading(false);
    }
  };

  const popUpFrame = (paymentLink) => {
    const popup = window.open(
      paymentLink,
      "_self",
      "height=600,width=800, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=no, directories=no, status=no"
    );
    popup.onclose = () => {
      alert("popup closed");
      console.log("Pop up close");
    };
  };
  return (
    <>
      <div className={styles.cart}>
        {loading && <LoaderComponent />}
        <CartMessage message={store.fields?.thank_you_note} />

        <PersonalForm ref={personalFormRef} />

        <AddressForm ref={addressFormRef} />

        <Order
          checkInputs={async () => {
            const isPersonalFormValid =
              await personalFormRef.current.validate();
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
      <Toast
        type="error"
        message="Something went wrong! Please try again"
        open={error}
      />

    </>
  );
};

export default Cart;
