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

      {order.products.map((item) => (
        <div className={orderStyles.orderDiv}>
          <div>{item.name}</div>  
          <div className={orderStyles.orderTotal}>{item.price} </div>
        </div>
      ))}

      {/* <div className={orderStyles.orderTotal}>₹{order.order_total}</div> */}
    </div>
  );
}
