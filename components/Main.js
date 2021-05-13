import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import Image from "next/image";

import ImageButton from "./ImageButton";
import Details from "./Details";
import StoreItem from "./StoreItem";

const Main = () => {
  const [mainClass, setMainClass] = useState(styles.main);

  const measureScroll = (e) => {
    if (e.target.scrollTop > 180) setMainClass(styles.scrollMain);
    else setMainClass(styles.main);
  };

  return (
    <main className={mainClass} onScroll={measureScroll}>
      <div className={styles.profile}>
        <div className={styles.social}>
          <img
            src="/profile-pic.jpg"
            alt="profile-pic"
            className={styles.profilePic}
          />
          <div className={styles.socialButtons}>
            <ImageButton
              type="raised"
              action={() => {
                window.open("https://www.instagram.com/bindilife/");
              }}
            >
              <Image src="/instagram.png" width="24" height="24" />
            </ImageButton>
            <ImageButton type="raised" action={() => {}}>
              <Image src="/share.png" width="24" height="24" />
            </ImageButton>
          </div>
        </div>

        <div className="userInfo">
          <h2>Neikimlhing (Kim)</h2>
          <div className="handle">@neikimlhing_</div>

          <Details summary="Keeping things whacky">
            Rem et eius explicabo eligendi. Non aut est possimus aut ea magni
            fuga et. Excepturi voluptas eaque fuga adipisci saepe autem sint.
            Accusamus nemo saepe et. Ut itaque doloremque accusantium nobis ea
            consequatur perspiciatis laboriosam. Ipsam et aut quo molestias.
          </Details>
        </div>
      </div>

      <div className={styles.store}>
        <h2 className={styles.storeHeading}>4 products listed</h2>

        <div className={styles.storeItems}>
          <StoreItem imgUrl="/camo/bitmap.png" />
          <StoreItem imgUrl="/camo/bitmap.png" />
          <StoreItem imgUrl="/camo/bitmap.png" />
          <StoreItem imgUrl="/camo/bitmap.png" />
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles.tagline}>
          <span>Take your sidehustle to a whole new level.</span>

          <div className={styles.instruction}>
            <span>Setup your own store.</span>
            <span>FOR FREE</span>
          </div>
        </div>

        <input
          placeholder="Your whatsapp number"
          className={styles.numberInput}
        />

        <button className={styles.inviteButton}>GET INVITE</button>
      </footer>
    </main>
  );
};

export default Main;
