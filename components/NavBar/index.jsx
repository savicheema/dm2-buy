import styles from './index.module.css'
import EllipsisText from "react-ellipsis-text";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import SideBar from '../SideBar';
import { useScrollDirection } from 'react-use-scroll-direction';

const NavBar = (props) => {
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [direction, setDirection] = React.useState(String);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  React.useEffect(() => {
    isScrollingDown && setDirection('down');
    isScrollingUp && setDirection('up');
  }, [isScrollingDown, isScrollingUp]);

  return (
    <header className={styles.navBar + ' ' + (direction === 'down' ? styles.hide : '')}>
      <div className={styles.hamTitleContainer}>
        <button className={styles.hamBtn} onClick={()=>setIsHamOpen((o)=>!o)}>
          {/* {isHamOpen ? (
              <Image src='/ham-close.svg' layout="fixed" width="18" height="18" />
            ):(
              "ham"
            )
          } */}
          {
            props.homeActive
            ? <div className={isHamOpen ? styles.open : null} >
              <span></span>
              <span></span>
              {
                isHamOpen 
                ? <>
                  <span></span>
                  <span></span>
                </> : ''
              }
            </div> : ''
          }
        </button>
        <h2 className={styles.storeName} onClick={() => window.location.href = window.location.origin}>
          <EllipsisText
            // text={store.fields.store_name}
            text={props.storeName}
            length={20}
            tail="..."
          />
        </h2>
        <span className={styles.cartIcon}>
          {
            props.cartActive && !props.hideInAdvance
            ? <Image
                onClick={() => props.handleShowCart(true)}
                src='/cart-icon.svg'
                layout="fixed"
                width="21"
                height="21" />
            : ''
          }
        </span>
      </div>
      <SideBar isHamOpen={isHamOpen} />
    </header>
  )
}

export default NavBar
