import React, { useEffect, useState } from "react";
import styles from "./bag.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CART_KEY } from "../../services/frontend/StorageKeys";
import { getPrice } from "../../services/frontend/pricing.service";
import StorageManager from "../../services/frontend/StorageManager";
import LoaderComponent from "../Loader";
import Image from "next/image";

export default function Bag() {
  const [cart, setCart] = useLocalStorage(CART_KEY, []);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const {
      productTotalPrice,
      total,
      paymentProcessingFee: processingFee,
    } = getPrice(cart);
    setPrice(productTotalPrice);
  }, [cart]);

  const removeProductFromCart = (productId) => () => {
    const cartData = StorageManager.getJson(CART_KEY, []);
    const filteredCart = cartData.filter((product) => product.id !== productId);
    StorageManager.putJson(CART_KEY, filteredCart);
    setCart(filteredCart);
    if (filteredCart.length === 0) {
      setLoading(true);
      window.location.href = "/";
    }
  };

  return (
    <>
      {loading && <LoaderComponent />}
      <div className={styles.bagContainer}>
        <div className={styles.order}>
          <h2 className={styles.orderTitle}>
            <span>🛍️</span> Your Bag
          </h2>
          <div className={styles.orderList}>
            {cart.map((product) => (
              <div className={styles.orderItem}>
                <div className={styles.productDetails}>
                  <Image
                    src={product.fields["header_photo"][0].url}
                    height={60}
                    width={60}
                    alt="Order name"
                    className={styles.orderThumbnail}
                    priority
                  />
                  <div className={styles.productName}>
                    {product.fields.Name}
                  </div>
                </div>
                <div className={styles.details_right}>
                  <div className={styles.productPrice}>
                    {`${String.fromCharCode(0x20b9)}${product.fields.Price}`}
                  </div>
                  <img
                    onClick={removeProductFromCart(product.id)}
                    src="/invalid-name@2x.png"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.empty_div}></div>
        </div>
        <div className={styles.bottomCTASection}>
          <button
            className={styles.orderButton}
            onClick={async () => {
              window.location.href = `/cart/checkout`;
            }}
          >
            Checkout — ₹{price}
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
      </div>
    </>
  );
}
