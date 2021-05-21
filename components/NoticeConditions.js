import React from "react";
import styles from "./notice-conditions.module.css";
import Image from "next/image";

import Details from "./Details";

import EllipsisText from "react-ellipsis-text";

const NoticeConditions = () => (
  <div className={styles.noticeCondtions}>
    <div className={styles.noticeBox}>
      <Image
        src="/caution.png"
        height="28"
        width="32"
        className={styles.image}
      />

      <div className={styles.noticeMessage}>
        <Details
          summary={
            <EllipsisText
              text={`This store does not offer returns, exchanges or cancellations `}
              length={60}
              tail="..."
            />
          }
        >
          {`This store does not offer returns, exchanges or cancellations `}
        </Details>
      </div>
    </div>
  </div>
);

export default NoticeConditions;
