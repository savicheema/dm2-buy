import orderStyles from "../../pages/order/order.module.css";
import React from "react";
import styles from "../Cart/bag-item.module.css";

export default function PackageDetails(props) {
  const { order } = props;
  console.log("ORDER", order);
  return (
    <div className={orderStyles.packageDetailContainer}>
      <div className={orderStyles.packageDetailDiv}>
        <div className={orderStyles.packageDetail}>Package Details</div>
        <div className={orderStyles.packageIcon}>📦</div>
      </div>

      {order.products.map((item) => (
        <div className={orderStyles.orderDiv}>
          <div>
            {item.name} <span> &#215;</span> {item.quantity}
            <div className={styles.product_specs}>
              {item.customAttributes?.map((ca) => (
                <span>
                  {ca.name} - {ca.value + " "}
                </span>
              ))}
            </div>
          </div>
          <div className={orderStyles.orderTotal}>
            ₹{item.quantity * item.price}{" "}
          </div>
        </div>
      ))}

      {/* <div className={orderStyles.orderTotal}>₹{order.order_total}</div> */}
    </div>
  );
}
