import orderStyles from "../../pages/order/order.module.css";

export default function BuyerDetails(props) {
  const { order } = props;
  return (
    <div className={orderStyles.buyerContainer}>
      <div style={{ width: "90%" }}>
        <div style={{ fontSize: 25 }}>{order.buyer.name}</div>
        <div style={{ marginTop: 10 }}>
          <div>{order.address.address_line_1}</div>
          <div>
            <span>{order.address.city}</span>,{"  "}
            <span>{order.address.state}</span>{"  "}
            <span>{order.address.pincode}</span>
          </div>
          <div>INDIA</div>
          <div></div>
          <div>PH.+{order.buyer.phone}</div>
        </div>
      </div>
      <div className={orderStyles.homeIcon}>🏠</div>
    </div>
  );
}
