import orderStyles from "../../pages/order/order.module.css";
import React from "react";

export default function BuyerDetails(props) {
  const { order } = props;
  return (
    <div className={orderStyles.buyerContainer}>
      <div className={orderStyles.buyerInfo}>
        <div className={orderStyles.buyerName}>{order.buyer.name}</div>
        <div className={orderStyles.buyerAddress}>
          <div>{order.address.address_line_1}</div>
          <div>
            <span>{order.address.city}</span>, {" "}
            <span>{order.address.state}</span>{" "}
            <span>{order.address.pincode}</span>
          </div>
          <div></div>
          <div>INDIA</div>
          <div>PH.+{order.buyer.phone}</div>
        </div>
      </div>
      <div className={orderStyles.homeIcon}>🏠</div>
    </div>
  );
}
