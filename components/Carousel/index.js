import React from "react";
import "./index.module.css";
import Image from "next/image";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import Indicator from "./Indicator";

const DM2BuyCarousel = ({ product }) => (
  <div>
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop={true}
      renderArrowPrev={(onClickHandler) => {
        return <PrevArrow handler={onClickHandler} />;
      }}
      renderArrowNext={(onClickHandler) => {
        return <NextArrow handler={onClickHandler} />;
      }}
      renderIndicator={(onClickHandler, isSelected, index) => {
        return (
          <Indicator
            handler={onClickHandler}
            isSelected={isSelected}
            key={index}
          />
        );
      }}
    >
      {product.allPhotos &&
        product.allPhotos.map((photo, index) => {
          return <Image src={photo.url} height="425" width="360" key={index} />;
        })}
    </Carousel>
  </div>
);

export default DM2BuyCarousel;
