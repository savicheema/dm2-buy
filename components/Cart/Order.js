import React from 'react';
import styles from './order.module.css';
import constants from '../../constants';
// import NoticeConditions from '../NoticeConditions';

export default function Order(props) {
  let product = props.product;
  const price = product.fields.Price + constants.regularDeliveryFee;
  const paymentProcessingFee = Number((price * 0.02).toFixed(2));
  const priceWithPaymentProcessingFee = price + paymentProcessingFee;
  return (
    <>
      <div className={styles.order}>
        <h2 className={styles.orderTitle}>
          <span>📦</span> Your Order
        </h2>
        <div className={styles.orderList}>
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
              <div className={styles.productName} style={{ width: '8rem' }}>
                Payment Processing Fee
              </div>
            </div>
            <div className={styles.productPrice}>
              {`${String.fromCharCode(0x20b9)}${paymentProcessingFee}`}
            </div>
          </div>
        </div>
      </div>
      <button
        className={styles.orderButton}
        onClick={async () => {
          const isFormValid = await props.checkInputs();
          if (isFormValid) {
            localStorage.removeItem('product');
          }
        }}
      >
        {`Pay ${String.fromCharCode(0x20b9) + priceWithPaymentProcessingFee}`}
      </button>
      {/* <NoticeConditions /> */}
    </>
  );
}
