import orderStyles from "../../pages/order/order.module.css";

export default function PackageDetails(props) {
  const { order, style } = props;
  return (
    <div className={orderStyles.packageDetailContainer} {...style}>
      <div className={orderStyles.packageDetailDiv}>
        <div className={orderStyles.packageDetail}>Package Details</div>
        <div className={orderStyles.packageIcon}>📦</div>
      </div>
      <div className={orderStyles.orderDiv}>
        <div className={orderStyles.orderName}>
          {order.products.map((item) => item.name)}
        </div>
        <div className={orderStyles.orderTotal}>₹{order.order_total}</div>
      </div>
    </div>
  );
}
