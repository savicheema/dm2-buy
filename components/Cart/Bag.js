import React, { useEffect, useState } from "react";
import styles from "./bag.module.css";
import useLocalStorage from "../../hooks/useLocalStorage";
import { CART_KEY } from "../../services/frontend/StorageKeys";
import { initialCart } from "../../services/ObjectsInitialValues";
import { getPrice } from "../../services/frontend/pricing.service";
import StorageManager from "../../services/frontend/StorageManager";
import LoaderComponent from "../Loader";
import BagItem from "./BagItem";

export default function Bag() {
  const [cart, setCart] = useLocalStorage(CART_KEY, initialCart);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { productTotalPrice, shippingFee } = getPrice(cart);
    setPrice(productTotalPrice - shippingFee);
  }, [cart]);

  const removeProductFromCart = (productId) => () => {
    console.log('removePRODUCTFROMCART', productId, {cart});
    const cartData = cart;
    // const cartData = StorageManager.getJson(CART_KEY, initialCart);
    const filteredProducts = cartData.products.filter((product) => product.id !== productId);
    cartData.products = filteredProducts;
    StorageManager.putJson(CART_KEY, cartData);
    setCart(cartData);
    if (filteredProducts.length === 0) {
      setLoading(true);
      window.location.href = "/";
    }
  };

  const updateProductCount = (productId, count) => {
    console.log('updatePRODUCTFROMCART', productId, {cart});
    const cartData = cart;
    // const cartData = StorageManager.getJson(CART_KEY, initialCart);
    // update count
    const productIndex = cartData.products.findIndex(
      (product) => product.id === productId
    );
    if (productIndex < 0) return;

    cartData.products[productIndex].quantity = count;
    StorageManager.putJson(CART_KEY, cartData);
    setCart(cartData);
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
            {cart.products.map((product, index) => (
              <BagItem
                item={product}
                removeProductFromCart={removeProductFromCart}
                updateProductCount={updateProductCount}
                key={index}
              />
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
              window.location.href = `/shop`;
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
