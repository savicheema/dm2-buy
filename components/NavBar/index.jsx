import styles from './index.module.css'
import EllipsisText from "react-ellipsis-text";
import { useState } from 'react';
import Image from "next/image";
import SideBar from '../SideBar';


const NavBar = (props) => {
  const [isHamOpen, setIsHamOpen] = useState(false);
  return (
    <header className={styles.navBar}>
      <div className={styles.hamTitleContainer}>
        <button className={styles.hamBtn} onClick={()=>setIsHamOpen((o)=>!o)}>
          {/* {isHamOpen ? (
              <Image src='/ham-close.svg' layout="fixed" width="18" height="18" />
            ):(
              "ham"
            )
          } */}
          <div className={isHamOpen ? styles.open : null} >
            <span></span>
            <span></span>
            {
              isHamOpen 
              ? <>
                <span></span>
                <span></span>
              </> : ''
            }
          </div>
        </button>
        <h2 className={styles.storeName}>
          <EllipsisText
            // text={store.fields.store_name}
            text={props.storeName}
            length={20}
            tail="..."
          />
        </h2>
        <span className={styles.cartIcon}>
          {
            props.cartActive
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
