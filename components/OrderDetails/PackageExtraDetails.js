import orderStyles from "../../pages/order/order.module.css";
import React from "react";

export default function PackageExtraDetails(props) {
  const { instaUserId } = props;
  return (
    <div className={orderStyles.orderInfoContainer}>
      <div className={orderStyles.orderInfo}>
        <h6 className={orderStyles.orderInfoHeader}>Shipping</h6>
        <div className={orderStyles.dividerContainer}>
          <hr className={orderStyles.divider} />
        </div>
        <h6 className={orderStyles.orderInfoDiscription}>
          Ships within 3 days
        </h6>
      </div>
      <div className={orderStyles.orderInfoSecond}>
        <h6 className={orderStyles.orderInfoHeader}>Order Updates</h6>
        <div className={orderStyles.dividerContainer}>
          <hr className={orderStyles.divider} />
        </div>
        <h6 className={orderStyles.orderInfoDiscription}>
          All updates via Email and Whatsapp
        </h6>
      </div>
      <div className={orderStyles.orderInfo}>
        <h6 className={orderStyles.orderInfoHeader}>Support</h6>
        <div className={orderStyles.dividerContainer}>
          <hr className={orderStyles.divider} />
        </div>
        <h6 className={orderStyles.orderInfoDiscription}>
          DM me on ig {instaUserId} for queries
        </h6>
      </div>
    </div>
  );
}
