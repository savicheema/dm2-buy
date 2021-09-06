import React, { useEffect, useState } from "react";
import styles from "./bag.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CART_KEY } from "../../services/frontend/StorageKeys";
import { getPrice} from "../../services/frontend/pricing.service";
import StorageManager from "../../services/frontend/StorageManager";

export default function Bag() {
  const [cart, setCart] = useLocalStorage(CART_KEY, []);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const { productTotalPrice, total, paymentProcessingFee: processingFee } = getPrice(cart);
    setPrice(productTotalPrice);
  }, [cart]);

  const removeProductFromCart = (productId) => () => {
    const cartData = StorageManager.getJson(CART_KEY, []);
    const filteredCart = cartData.filter(product => product.id !== productId);
    StorageManager.putJson(CART_KEY, filteredCart);
    setCart(filteredCart);
    if (filteredCart.length === 0) {
      window.location.href = '/';
    }
  }

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
              <button className={styles.productName} onClick={removeProductFromCart(product.id)}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.bottomCTASection}>
        <button
          className={styles.orderButton}
          onClick={async () => {
            window.location.href = `/cart/checkout`;
          }}
        >
          Checkout
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
