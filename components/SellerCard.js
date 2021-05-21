import React, { useState, useEffect } from "react";
import styles from "./seller-card.module.css";
import homeStyles from "../styles/Home.module.css";

import Image from "next/image";

import { ImageButton } from "./Buttons";

const SellerCard = ({ sellerId }) => {
  const [seller, setSeller] = useState(undefined);

  const getSeller = () => {
    const url = new URL(
      `${window.location.protocol}//${window.location.host}/api/airtable/getRecord`
    );
    url.searchParams.set("store", sellerId);
    fetch(url)
      .then((response) => {
        console.log("STORE RESPONSE", response);
        return response.json();
      })
      .then((data) => {
        console.log("STORE DATA", data);
        setSeller(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getSeller();
  }, [seller]);

  if (!seller) return null;

  return (
    <div className={styles.sellerCard}>
      {seller.fields && (
        <div className={styles.social}>
          <img
            src={seller.fields.store_profile_photo[0].url}
            alt="profile-pic"
            className={homeStyles.profilePic}
          />
          <div className="details">
            <div className={styles.instagramHandle}>
              {`@${seller.fields.store_instagram_handle}`}
            </div>

            <div className={styles.area}>{`${seller.fields.location}`}</div>
          </div>
          <div className={styles.socialButtons}>
            <ImageButton
              type="raised"
              action={() => {
                window.open(
                  `https://www.instagram.com/${seller.fields.store_instagram_handle}/`
                );
              }}
            >
              <Image src="/instagram.png" width="24" height="24" />
            </ImageButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerCard;
