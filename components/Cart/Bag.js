import React, { useEffect, useState } from "react";
import styles from "./bag.module.css";
import constants from "../../constants";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CART_KEY } from "../../services/frontend/StorageKeys";
import { getPrice} from "../../services/frontend/pricing.service";

export default function Bag() {
  const [cart, setCart] = useLocalStorage(CART_KEY, []);
  const [price, setPrice] = useState(0);
  const [paymentProcessingFee, setPaymentProcessingFee] = useState(0);
  const [priceWithPaymentProcessingFee, setPriceWithPaymentProcessingFee] = useState(0);

  useEffect(() => {
    const { productTotalPrice, total, paymentProcessingFee: processingFee } = getPrice(cart);
    setPrice(productTotalPrice);
    setPaymentProcessingFee(processingFee);
    setPriceWithPaymentProcessingFee(total);
  }, [cart]);

  return (
    <>
      <div className={styles.order}>
        <h2 className={styles.orderTitle}>
          <span>🛍️</span> Your Bag
        </h2>
        <div className={styles.orderList}>
          {cart.map((product) => (
            <div className={styles.orderItem}>
              <div className={styles.productDetails}>
                <img
                  src={product.fields["header_photo"][0].url}
                  height="60"
                  width="60"
                  alt="Order name"
                  className={styles.orderThumbnail}
                />
                <div className={styles.productName}>{product.fields.Name}</div>
              </div>
              <div className={styles.productPrice}>
                {`${String.fromCharCode(0x20b9)}${product.fields.Price}`}
              </div>
            </div>
          ))}

          <div className={styles.orderItem}>
            <div className={styles.productDetails}>
              <span className={styles.shippingEmoji}>🚛</span>

              <div className={styles.productName}>Shipping Fee</div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${constants.regularDeliveryFee}`}
            </div>
          </div>

          <div className={styles.orderItem}>
            <div className={styles.productDetails}>
              <span className={styles.shippingEmoji}>💳</span>
              <div className={styles.productName} style={{ width: "8rem" }}>
                Payment Processing Fee
              </div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${paymentProcessingFee}`}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottomCTASection}>
        <button
          className={styles.orderButton}
          onClick={async () => {
            window.location.href = `/cart/checkout`;
          }}
        >
          {`Pay ${String.fromCharCode(0x20b9) + priceWithPaymentProcessingFee}`}
        </button>
        <button
          className={styles.continueShoppingButton}
          onClick={async () => {
            window.location.href = `/`;
          }}
        >
          Continue Shopping
        </button>
      </div>
    </>
  );
}
