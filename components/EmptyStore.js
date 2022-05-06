import React from "react";
import styles from "./empty-store.module.css";

import Image from "next/image";

const EmptyStore = (store) => (
  <div className={styles.noProductContainer}>
    <div className={styles.emptyStore}>
      <Image
        className={styles.emptyBox}
        src="/smiley.png"
        width="96"
        height="96"
      />
      <div className={styles.title}>Oh deer, it’s empty!</div>
      <div className={styles.description}>{store?.store?.storeName} haven't added any<br/> products to their shop yet.<br/> 
        If you'd like to see them here, we'd<br/> love for you to drop them an invite.</div>
      <a href={`instagram://user?username=${store?.store?.contactInfo?.instagramHandle}`} className={styles.invitebutton}>INVITE</a>
    </div>
  </div>
);

export default EmptyStore;
