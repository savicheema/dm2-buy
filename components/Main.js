import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import homeStyles from "../styles/Home.module.css";
import Image from "next/image";
import StoreProducts from "./StoreProducts";
import { ShareButton, ImageButton } from "./Buttons";
import Footer from "./Footer";
import EllipsisText from "react-ellipsis-text";
import Toast from "./Toast";
import NavBar from "./Navbar"
import Home from "./Home";
import useLocalStorage from "./../hooks/useLocalStorage";
import { CART_KEY } from "./../services/frontend/StorageKeys";
import { initialCart } from "./../services/ObjectsInitialValues";
import StorageManager from "./../services/frontend/StorageManager";
import Basket from "./Cart/Basket";
// import CollectionSection from "./CollectionSection";

const Main = ({ store, endLoading, loading, hideHeroMedia}) => {
  console.log('dev-homepage branch live.');
  const [cart, setCart] = useLocalStorage(CART_KEY, initialCart);
  const [open, setOpen] = useState(false);
  const homePageEnabled = store?.homePage?.homePageEnabled;
  console.log('store?.homePage?: ', store?.homePage);
  const [homeActive, setHomeActive] = useState(homePageEnabled && homePageEnabled === true ? (hideHeroMedia ? false : true) : false);
  const [showCart, setShowCart] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collectionTitle, setCollectionTitle] = useState('');
  const [collectionSection, setCollectionSection] = useState({});
  const [collectionName, setCollectionName] = useState('');

  const updateHomeActive = (boolVal = false) => {
    setHomeActive(boolVal);
    if (typeof window !== 'undefined') {
      window.history.pushState("object or string", "Title", "shop");
    }
  }

  const handleShowCart = (boolVal = false) => {
    setShowCart(boolVal);
  }

  const getCollections = () => {
    let collectionData = store?.homePage?.sections && store?.homePage?.sections.length
    ? store?.homePage?.sections.filter(section => section?.type === 'collections list') : null;

    if (collectionData && collectionData?.length) {
      setCollectionSection(collectionData[0]);
    }
    
    let collectionTitle = collectionData && collectionData.length && collectionData[0]
    ? collectionData[0]?.title : null;
    collectionData = collectionData && collectionData.length && collectionData[0]
      ? collectionData[0]?.collections : null;

    setCollectionTitle(collectionTitle);

    // if (collectionData && collectionData.length) {
    //   collectionData = JSON.stringify(collectionData);
    //   return new Promise((resolve, reject) => {
    //     fetch(
    //       `/api/airtable/getCollections?collectionIds=${collectionData}`
    //     )
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((data) => {
    //         setCollections(data);
    //         resolve(data);
    //       })
    //       .catch((err) => {
    //         console.error(err);
    //         reject();
    //       });
    //   });
    // }
  }

  const showToast = () => {
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleRefresh = () => {
    setCart({
      products: [],
      shippingFee: 0,
      shippingFeeCap: 0
    });
  }

  if (!store) return null;

  useEffect(() => {
    getCollections();
    // if (typeof window !== 'undefined') {
    //   const params = new Proxy(new URLSearchParams(window.location.search), {
    //     get: (searchParams, prop) => searchParams.get(prop),
    //   });
    
    //   setCollectionName(params.collection);

    //   setTimeout(() => {
    //     window.scrollTo(0, 0);
    //   }, 2000);
    // }
  }, []);

  return (
    <main
      className={styles.main}
      style={{
        transition: "max-height 0.2s",
      }}
    >
      <Basket
        setRefresh={handleRefresh}
        isBasketOpen={showCart}
        setCart={setCart}
        cartData={cart}
        StorageManager={StorageManager}
        CART_KEY={CART_KEY}
        handleShowCart={handleShowCart}/>
      {
        <NavBar
          cartActive={cart.products.length ? true : false}
          handleShowCart={handleShowCart}
          hideInAdvance={false}
          homeActive={homePageEnabled && homePageEnabled === true ? true : false}
          store={store}
          storeName={store?.storeName || ''}
        />
      }
      {
         homeActive ?
         <Home
           updateHomeActive={updateHomeActive}
           heroMedia={store?.homePage?.heroMedia}
           heroTitle={store?.homePage?.heroTitle}
           heroDescription={store?.homePage?.heroDescription}
           endLoading={endLoading}
           loading={loading}/>
         : <>
            <div className={styles.profile}>
              {/* {store && (
                <div className={styles.social}>
                  <Image
                    width={102}
                    height={102}
                    src={store.store_profile_photo[0].url}
                    alt="profile-pic"
                    className={homeStyles.profilePic}
                  />
                </div>
              )} */}

              {/* {store.fields && (
                <div className="userInfo">
                  <h2 className={styles.userName}>
                    <EllipsisText
                      text={store.store_name}
                      length={20}
                      tail="..."
                    />
                  </h2>
                  {store.store_bio.trim() != "" && (
                    <p
                      className={styles.bio}
                      dangerouslySetInnerHTML={{ __html: store.store_bio }}
                    ></p>
                  )}
                </div>
              )} */}
              {/* {store && (
                <div className={styles.socialButtons}>
                  <ImageButton
                    type="raised"
                    action={() => {
                      window.open(
                        `https://www.instagram.com/${store.store_instagram_handle}/`
                      );
                    }}
                  >
                    <Image src="/instagram-4@2x.png" width="20" height="20" />
                  </ImageButton>
                  <ShareButton
                    title={store?.store_name || "Dm 2 Buy"}
                    toast={showToast}
                  />
                </div>
              )} */}
            </div>

            {store && (
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
