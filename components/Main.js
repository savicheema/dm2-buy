import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import homeStyles from "../styles/Home.module.css";

import Image from "next/image";

import Details from "./Details";
import StoreProducts from "./StoreProducts";
import { ShareButton, ImageButton } from "./Buttons";

// import EllipsisText from "react-lines-ellipsis";
import EllipsisText from "react-ellipsis-text";

const Main = ({ store, endLoading }) => {
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
              className={homeStyles.profilePic}
            />
            {/* <div className={styles.socialButtons}>
              <ImageButton
                type="raised"
                action={() => {
                  window.open(
                    `https://www.instagram.com/${store.fields.store_instagram_handle}/`
                  );
                }}
              >
                <Image src="/instagram.png" width="24" height="24" />
              </ImageButton>
              <ShareButton />
            </div> */}
          </div>
        )}

        {store.fields && (
          <div className="userInfo">
            <h2 className={styles.userName}>
              <EllipsisText
                text={store.fields.store_name}
                length="20"
                tail="..."
              />
            </h2>
            {/* <div className={styles.instagramHandle}>
              {`@${store.fields.store_instagram_handle}`}`
            </div> */}

            {/* <Details
              summary={
                <EllipsisText
                  text={store.fields.store_bio}
                  length="35"
                  tail="..."
                />
              }
            >
              {store.fields.store_bio}
            </Details> */}
            {store.fields.store_bio.trim() != "" && (
              <p className={styles.bio}>{store.fields.store_bio}</p>
            )}
          </div>
        )}
        <div className={styles.socialButtons}>
          <ImageButton
            type="raised"
            action={() => {
              window.open(
                `https://www.instagram.com/${store.fields.store_instagram_handle}/`
              );
            }}
          >
            <Image src="/instagram-4.png" width="20" height="20" />
          </ImageButton>
          <ShareButton />
        </div>
      </div>

      {store.fields && <StoreProducts store={store} endLoading={endLoading} />}
    </main>
  );
};

export default Main;
