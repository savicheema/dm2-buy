import { useState, useEffect } from "react";
import styles from "./bag-item.module.css";
import Image from "next/image";
import ImageButton from "../Buttons/ImageButton";

const BagItem = ({ item, removeProductFromCart, updateProductCount }) => {
  const [count, setCount] = useState(item.quantity || 1);
  const [availableStock, setAvailableStock] = useState(0);
  const availableProductQuantity = item?.productCount
    ? parseInt(item?.productCount)
    : Number.MAX_SAFE_INTEGER;
  const isProductCustomised = item.customAttributes.length > 0;

  const countEffect = () => {
    updateProductCount(item.id, count);
    if (item.size || item.colour) {
      const stock = findProductStockAndPrice(item.size, item.colour, item);
      setAvailableStock(stock.stockAvailable);
    } else {
      setAvailableStock(item.availableStock);
    }
  };
  useEffect(countEffect, [count]);

  if (item?.fields?.['Other photos']?.length) {
    localStorage.clear();
    window.location.reload();
  }

  const findProductStockAndPrice = (size, colour, product) => {
    if (!size) {
      size = '-';
    }
    if (!colour) {
      colour = '-';
    }
    const variantPrice = product.variantPrice;
    const variantObj = {};
    
    if (!variantPrice || (variantPrice && !variantPrice.length)) {
      return product.price;
    }

    variantPrice.forEach(variant => {
      let vSize = variant?.fields?.options?.filter(size => size?.fields?.type === 'fit');
      vSize = vSize && vSize.length ? vSize[0]?.fields?.name : '-';
      let vColor = variant?.fields?.options?.filter(colour => colour?.fields?.type === 'colour');
      vColor = vColor && vColor.length ? vColor[0]?.fields?.name : '-';
      if (!variantObj[vSize]) {
        variantObj[vSize] = {
          [vColor]: {
            price: variant?.fields?.price,
            stockAvailable: variant?.fields?.stockAvailable
          }
        };
      } else {
        variantObj[vSize][vColor] = {
          price: variant?.fields?.price,
          stockAvailable: variant?.fields?.stockAvailable
        };
      }
    });

    return variantObj[size][colour];
  }

  return (
    <div className={styles.orderItem}>
      <div className={styles.productDetails}>
        <div className={styles.thumbnailContainer}>
          <Image
            src={item?.productPhotos[0]}
            height={60}
            width={60}
            alt="Order name"
            className={styles.orderThumbnail}
          />

          {item.colour ? (
            <div
              className={styles.productColor}
              style={{ backgroundColor: item.colour }}
            ></div>
          ) : null}
        </div>
        <div className={styles.productName}>
          <span>{item.name}</span>
          {isProductCustomised && (
            <div className={styles.product_specs}>
              {item.customAttributes
                .map((ca, index) => (
                  <span key={index + 1}>
                    {ca.name} - {ca.value + ""}
                  </span>
                ))
                .reduce((prev, curr) => [prev, ", ", curr])}
            </div>
          )}
          <div className={styles.product_specs}>
            {
              item.size
                ? 'Size - ' + item.size : ''
            }
          </div>
          {availableProductQuantity > 1 && !isProductCustomised && (
            <div className={styles.quantityControls}>
              <ImageButton
                type="raised"
                action={() => {
                  if (count < 2) return;
                  setCount(count - 1);
                }}
              >
                <Image src="/buttons/decrement@3x.png" width={9} height={2} />
              </ImageButton>
              <span>{count}</span>
              <ImageButton
                type="raised"
                action={() => {
                  if (count < availableStock) {
                    setCount(count + 1);
                  }
                }}
              >
                <Image src="/buttons/increment@3x.png" width={9} height={9} s />
              </ImageButton>
            </div>
          )}
        </div>
      </div>
      <div className={styles.details_right}>
        <div className={styles.productPrice}>
          {`${String.fromCharCode(0x20b9)}${count * item.price}`}
        </div>
        <img
          onClick={removeProductFromCart(item.id)}
          src="/invalid-name@2x.png"
        />
      </div>
    </div>
  );
};

export default BagItem;
