import styles from './index.module.css';
import EllipsisText from "react-ellipsis-text";
import React, { useState, useEffect } from 'react';
import { useScrollDirection } from 'react-use-scroll-direction';

const MarketNavbar = (props) => {
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = React.useState(String);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  useEffect(() => {
    setLoading(true);
    let { market } = props;
  }, []);

  useEffect(() => {
  }, []);

  React.useEffect(() => {
    if (isHamOpen) return;
    isScrollingDown && setDirection('down');
    isScrollingUp && setDirection('up');
  }, [isScrollingDown, isScrollingUp]);

  const checkoutShouldHide = () => {
    let shouldHide = false;
    if (typeof window != 'undefined') {
      if (window.scrollY > 120) {
        shouldHide = true;
      }
    }
    return shouldHide;
  }

  const makeBGWhite = () => {
    let shouldHide = false;
    if (typeof window != 'undefined') {
      if (window.scrollY > 30) {
        shouldHide = true;
      }
    }
    return shouldHide;
  }

  return (
    <header className={
      styles.navBar + ' '
      + (direction === 'up' ? styles.hideFade : '')
      + ' '
      + (direction === 'down' && checkoutShouldHide() ? styles.hide : '')
      + ' '
      + (direction === 'down' && makeBGWhite() ? styles.addBGWhite : '')
      } style={isHamOpen ? {
        backgroundColor: 'white'
      } : {}}>
      <div className={styles.hamTitleContainer}>
        <h2 className={styles.marketName} onClick={() => window.location.href = window.location.origin}>
          <EllipsisText
            text={props.marketName}
            length={20}
            tail="..."
          />
        </h2>
      </div>
    </header>
  )
}

export default MarketNavbar;
