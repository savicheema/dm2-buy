import { useState, useEffect } from "react";
import styles from "./product-colors.module.css";
import ColorRadioButton from "./Buttons/ColorRadioButton";

const ProductColors = ({ colors, selectedColorInStorage='', setProductColor }) => {
  const [selectedColor, setSelectedColor] = useState(selectedColorInStorage || colors[0]);

  const setProductColorEffect = () => {
    setProductColor(selectedColor);
  };
  useEffect(setProductColorEffect, [selectedColor]);
  useEffect(() => {
    if(selectedColorInStorage){
      setSelectedColor(selectedColorInStorage);
    }
  }, [selectedColorInStorage]);

  return (
    <div className={styles.productColors}>
      <div className={styles.colorsHeading}>colour</div>
      {colors.map((color, index) => (
        <ColorRadioButton
          color={color}
          setColor={setSelectedColor}
          selectedColor={selectedColor}
        />
      ))}
    </div>
  );
};

export default ProductColors;
