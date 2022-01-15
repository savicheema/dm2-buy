import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import homeStyles from "../styles/Home.module.css";
import Image from "next/image";
import StoreProducts from "./StoreProducts";
import { ShareButton, ImageButton } from "./Buttons";
import Footer from "./Footer";
import EllipsisText from "react-ellipsis-text";
import Toast from "./Toast";
import NavBar from "./NavBar"
import Home from "./Home";
import useLocalStorage from "./../hooks/useLocalStorage";
import { CART_KEY } from "./../services/frontend/StorageKeys";
import { initialCart } from "./../services/ObjectsInitialValues";
import StorageManager from "./../services/frontend/StorageManager";

const Main = ({ store, endLoading, loading }) => {
  const [cart, setCart] = useLocalStorage(CART_KEY, initialCart);
  const [open, setOpen] = useState(false);
  const homePageEnabled = store?.fields?.homePageEnabled;
  const [homeActive, setHomeActive] = useState(homePageEnabled && homePageEnabled === 'true' ? true : false);
  const [showCart, setShowCart] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const updateHomeActive = (boolVal = false) => {
    setHomeActive(boolVal);
  }

  const showToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  if (!store) return null;

  return (
    <main
      className={styles.main}
      style={{
        transition: "max-height 0.2s",
      }}
    >
      {
        <NavBar
          cartActive={false}
          hideInAdvance={false}
          homeActive={homePageEnabled && homePageEnabled === 'true' ? true : false}
          storeName={store?.fields?.store_name || ''}
        />
      }
      {
         homeActive ?
         <Home
           updateHomeActive={updateHomeActive}
           heroMedia={store?.fields?.heroMedia}
           heroTitle={store?.fields?.heroTitle}
           heroDescription={store?.fields?.heroDescription}
           endLoading={endLoading}
           loading={loading}/>
         : <>
            <div className={styles.profile}>
              {/* {store.fields && (
                <div className={styles.social}>
                  <Image
                    width={102}
                    height={102}
                    src={store.fields.store_profile_photo[0].url}
                    alt="profile-pic"
                    className={homeStyles.profilePic}
                  />
                </div>
              )} */}

              {/* {store.fields && (
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
              )} */}
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
                loading={true}
              />
            )}
        </>
      }
      <Footer />
      <Toast type="success" message="Link copied successfully" open={open} />
    </main>
  );
};

export default Main;
