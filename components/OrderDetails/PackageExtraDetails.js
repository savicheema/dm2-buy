import orderStyles from "../../pages/order/order.module.css";

export default function PackageExtraDetails(props) {
  const { instaUserId } = props;
  return (
    <div style={{ marginTop: 50 }}>
      <p className={orderStyles.paraOne}>
        <h7 className={orderStyles.headingOne}>Shipping</h7>
        ................................................. Ships within 3 days
      </p>
      <p className={orderStyles.paraOne}>
        <h7 className={orderStyles.headingOne}>Order Updates</h7>
        .........All updates via Email and Whatsapp
      </p>
      <p className={orderStyles.paraOne}>
        <h7 className={orderStyles.headingOne}>Support</h7>.....DM me on ig
        {instaUserId} for queries
      </p>
    </div>
  );
}
