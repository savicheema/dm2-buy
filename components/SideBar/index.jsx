import styles from "./index.module.css"
import Image from "next/image";
import { useState } from "react";

// const CategoryTitle = ({title, link}) => {
//   return (

//   )
// }

const CategoryProduct = ({title, link, imageSrc}) => {
  return (
    <div className={styles.productContainer}>
      <Image src="/placeholder.webp" layout="fixed" width="50" height="50" />
      <div className={styles.productDesc}>
        <h4 className={styles.productTitle}>
          Bluebell
        </h4>
        <span className={styles.productPrice}>
          {String.fromCharCode(0x20b9)}2850
        </span>
      </div>
    </div>
  )
}

const CategoryAccordian = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.accordBar}>
      <div 
        onClick={()=>setIsOpen(o => !o)}
        className={styles.categoryTitleContainer}
      >
        <h2 className={styles.categoryTitle}>
          Dresses
        </h2>
        <button 
          style={{transform: `rotate(${isOpen ? '0' : '-90'}deg)`}} 
          className={styles.chevron}
        >
          {/* chevron */}
          <Image src="/down-chevron.png" layout="fixed" width="20" height="20" />
        </button>
      </div>
      <div style={{maxHeight: `${isOpen ? '300px': '0'}`}} className={styles.accordContent}>
        <CategoryProduct />
        <CategoryProduct />
        <CategoryProduct />
        <CategoryProduct />
        <button className={styles.seeAll}>See All</button>
      </div>
    </div>
  )
}

const SideBar = ({isHamOpen}) => {

  return (
    <aside className={styles.sideBar+' '+(isHamOpen ? styles.sideBarOpen : '' )}>
      <div className={styles.sideBarContainer}>
        <CategoryAccordian />
        <CategoryAccordian />
        <CategoryAccordian />
      </div>

    </aside>
  )
}

export default SideBar
