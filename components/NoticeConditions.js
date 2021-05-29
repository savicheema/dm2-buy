import React from "react";
import styles from "./notice-conditions.module.css";
import Image from "next/image";

import Details from "./Details";

import EllipsisText from "react-ellipsis-text";

const NoticeConditions = () => (
  <div className={styles.noticeCondtions}>
    <div className={styles.noticeBox}>
      <Image
        src="/warning-2.png"
        height="40"
        width="40"
        className={styles.image}
      />

      <div className={styles.noticeMessage}>
        {/* <Details
          summary={
            <EllipsisText
              text={`This store does not offer returns, exchanges or cancellations `}
              length={60}
              tail="..."
            />
          }
        >
          {`This store does not offer returns, exchanges or cancellations `}
        </Details> */}
        We do not offer returns, exchanges or cancellation on this product.
        <div className={styles.learnWhy}>Learn Why</div>
      </div>
    </div>
  </div>
);

export default NoticeConditions;
