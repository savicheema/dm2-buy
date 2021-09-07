import orderStyles from "../../pages/order/order.module.css";
import React from "react";

export default function PackageDetails(props) {
  const { order } = props;
  console.log(order);
  return (
    <div className={orderStyles.packageDetailContainer}>
      <div className={orderStyles.packageDetailDiv}>
        <div className={orderStyles.packageDetail}>Package Details</div>
        <div className={orderStyles.packageIcon}>📦</div>
      </div>
      <div className={orderStyles.orderDiv}>
        <div className={orderStyles.orderName}>
          {order.products.map((item) => {
            console.log(item);
            item;
          })}
        </div>
        <div className={orderStyles.orderTotal}>₹{order.order_total}</div>
      </div>
    </div>
  );
}
