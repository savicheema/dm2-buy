import { useState, useEffect, useCallback } from "react";
import styles from "./color-radio-button.module.css";

const ColorRadioButton = ({ color, setColor, selectedColor }) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectColorEffect = () => {
    setIsSelected(color === selectedColor);
  };
  useEffect(selectColorEffect, [selectedColor]);

  const updateColor = useCallback(() => {
    setColor(color);
  });
  return (
    <div
      className={isSelected ? styles.selectedRadioButton : ""}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "4px 8px",
        padding: "2px",
        border: "solid 0.5px transparent",
      }}
      onClick={updateColor}
    >
      <div style={{ backgroundColor: color }} className={styles.radioButton}>
        <input
          className={styles.hiddenInput}
          type="radio"
          name="color"
          value={color}
          onChange={updateColor}
        />
      </div>
    </div>
  );
};

export default ColorRadioButton;
