import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import Image from "next/image";

import ImageButton from "./ImageButton";
import Details from "./Details";
import StoreItem from "./StoreItem";

import LinesEllipsis from "react-lines-ellipsis";

const Main = ({ store }) => {
  const [mainClass, setMainClass] = useState(styles.main);

  const measureScroll = (e) => {
    if (e.target.scrollTop > 188) setMainClass(styles.scrollMain);
    else setMainClass(styles.main);
  };

  return (
    <main
      className={mainClass}
      onScroll={measureScroll}
      style={{
        transition: "max-height 0.2s",
      }}
    >
      <div className={styles.profile}>
        {store.fields && (
          <div className={styles.social}>
            <img
              src={store.fields.store_profile_photo[0].url}
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
        )}

        {store.fields && (
          <div className="userInfo">
            <h2 className={styles.userName}>
              <LinesEllipsis
                text={store.fields.store_name}
                maxLine="1"
                ellipsis="..."
                trimRight
                basedOn="letters"
              />
            </h2>
            <div className={styles.instagramHandle}>
              {`@${store.fields.store_instagram_handle}`}`
            </div>

            <Details
              summary={
                <LinesEllipsis
                  text={store.fields.store_bio}
                  maxLine="2"
                  ellipsis="..."
                  trimRight
                  basedOn="letters"
                />
              }
            >
              {store.fields.store_bio}
            </Details>
          </div>
        )}
      </div>

      <div className={styles.store}>
        <h2 className={styles.storeHeading}>4 products listed</h2>

        <div className={styles.storeItems}>
          {store.fields &&
            store.fields.Products.map((product, index) => {
              return <StoreItem productId={product} key={index} />;
            })}
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
