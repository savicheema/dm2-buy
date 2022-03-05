import React, { useState } from "react";
import styles from "./cart.module.css";

import CartMessage from "./CartMessage";
import PersonalForm from "./PersonalForm";
import AddressForm from "./AddressForm";
import Order from "./Order";
import Footer from "../Footer";
import { guid, getSubDomainOfPage } from "../../services/helper";
import Toast from "../Toast";
import LoaderComponent from "../Loader";
import { getPrice } from "../../services/frontend/pricing.service";
import StorageManager from "../../services/frontend/StorageManager";
import { CART_KEY } from "../../services/frontend/StorageKeys";

const Cart = ({ cart, store, applyPromoCode, removePromoCode }) => {
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
    const {
      shippingFee,
      shippingFeeCap,
      shippingFeeApplied,
      productTotalPrice,
      total,
      paymentProcessingFee: processingFee,
      couponId,
      couponCode
    } = getPrice(cart);
    setError(false);
    console.log(couponId, couponCode)
    const bodyData = {
      buyer_id: guid(),
      discountCode: {
        id: couponId,
        couponCode: couponCode,
      },
      order_shipping: shippingFee,
      payment_processing_fee: processingFee,
      order_total: parseInt(total).toFixed(2),
      buyer: personalFormRef.current.getValues(),
      address: addressFormRef.current.getValues(),
      seller: {
        name: await getSubDomainOfPage(),
        instagram: store?.fields?.store_instagram_handle,
        phone: store?.fields?.phone,
        seller_id: cart.products[0]?.fields?.Stores[0],
      },
      products: cart.products.map((product) => {
        let productObj = {
          customAttributes: product.customAttributes,
          colour: product?.colour,
          id: product?.id,
          name: product?.fields?.Name,
          price: product.fields.Price,
          quantity: product.quantity,
        };

        if (product.size) productObj.size = product.size;

        return productObj;
      }),
    };
    if(bodyData.discountCode.id == null) {
      delete bodyData.discountCode
    }
    if (total === 0 && bodyData.discountCode.id) {
      bodyData.payment_mode = 'giftcard';
    }
        
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
        console.log('res: ', res);
        if (res.payment && res.payment === 'completed') {
          window.location.href = `${window.location.protocol}//${window.location.host}/order/${res._id}`
        } else {
          popUpFrame(res.paymentLink);
        }
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
    <div className={styles.checkout_container}>
      <div className={styles.cart}>
        {loading && <LoaderComponent />}
        <CartMessage message={store.thankYouNote} />

        <PersonalForm ref={personalFormRef} />

        <AddressForm ref={addressFormRef} />

        <Order
          cart={cart}
          applyPromoCode={applyPromoCode}
          removePromoCode={removePromoCode}
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
        />
        <Footer />
      </div>
      <Toast
        type="error"
        message="Something went wrong! Please try again"
        open={error}
      />
    </div>
  );
};

export default Cart;
