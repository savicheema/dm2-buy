import styles from './index.module.css';
import EllipsisText from "react-ellipsis-text";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import SideBar from '../SideBar';
import { useScrollDirection } from 'react-use-scroll-direction';

const NavBar = (props) => {
  const [isHamOpen, setIsHamOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [direction, setDirection] = React.useState(String);
  const { isScrollingUp, isScrollingDown } = useScrollDirection();

  useEffect(() => {
    setLoading(true);
    let { store } = props;
    fetchAllProducts(store?.subdomain);
  }, []);

  useEffect(() => {
  }, [products]);

  const filterStoreProducts = (product) => {
    let { store } = props;
    return product.fields.Stores?.includes(store.id);
  };

  const fetchAllProducts = (subdomain) => {
    return new Promise((resolve, reject) => {
      fetch(`/api/airtable/getAllProducts?subdomain=${subdomain}`)
        .then((response) => {
          return response.json();
        })
        .then((productValues) => {
          setProducts(productValues.records.filter(filterStoreProducts));
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          alert("Error Loading store products!");
          setLoading(false);
          reject();
        });
    });
  };

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
        <button className={styles.hamBtn} onClick={()=>setIsHamOpen((o)=>!o)}>
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
      <SideBar loading={loading} products={products} isHamOpen={isHamOpen} />
    </header>
  )
}

export default NavBar
