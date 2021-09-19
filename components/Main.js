import React, { useState } from "react";
import styles from "./main.module.css";
import homeStyles from "../styles/Home.module.css";
import Image from "next/image";
import StoreProducts from "./StoreProducts";
import { ShareButton, ImageButton } from "./Buttons";
import Footer from "./Footer";
import EllipsisText from "react-ellipsis-text";
import Toast from "./Toast";

const Main = ({ store, endLoading, loading }) => {
  const [open, setOpen] = useState(false);
  const showToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };
  return (
    <main
      className={styles.main}
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
          </div>
        )}

        {store.fields && (
          <div className="userInfo">
            <h2 className={styles.userName}>
              <EllipsisText
                text={store.fields.store_name}
                length={20}
                tail="..."
              />
            </h2>
            {store.fields.store_bio.trim() != "" && (
              <p
                className={styles.bio}
                dangerouslySetInnerHTML={{ __html: store.fields.store_bio }}
              ></p>
            )}
          </div>
        )}
        {/* {store.fields && (
          <div className={styles.socialButtons}>
            <ImageButton
              type="raised"
              action={() => {
                window.open(
                  `https://www.instagram.com/${store.fields.store_instagram_handle}/`
                );
              }}
            >
              <Image src="/instagram-4@2x.png" width="20" height="20" />
            </ImageButton>
            <ShareButton
              title={store?.fields?.store_name || "Dm 2 Buy"}
              toast={showToast}
            />
          </div>
        )} */}
      </div>

      {store.fields && (
        <StoreProducts
          store={store}
          endLoading={endLoading}
          loading={loading}
        />
      )}
      <Footer />
      <Toast type="success" message="Link copied successfully" open={open} />
    </main>
  );
};

export default Main;
