import styles from "./index.module.css"
import Image from "next/image";
import { useState } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const CategoryProduct = ({product}) => {
  const[imageLoaded, setImageLoaded] = useState(false);
  return (
    <div
        onClick={() => {
            window.location.href = `/product/${product.id}`;
        }}
        className={styles.productContainer}>
      {
        !imageLoaded ? <span className={styles.categoryProductImage + ' ' + styles.imagePlaceholder}></span> : ''
      }
      <img
        style={!imageLoaded ? { display: 'none' } : {}}
        className={styles.categoryProductImage}
        onLoad={() => setImageLoaded(true)}
        src={product?.headerPhoto?.file?.url}
        layout="fixed" width="70" height="70" />
      <div className={styles.productDesc}>
        <span className={styles.productTitle}>
          {product?.name}
        </span>
        <span className={styles.productPrice}>
          {String.fromCharCode(0x20b9)}{product?.price}
        </span>
      </div>
    </div>
  )
}

const CategoryAccordian = ({category}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={styles.accordBar}>
      <div 
        onClick={()=>setIsOpen(o => !o)}
        className={styles.categoryTitleContainer}
      >
        <div className={styles.categoryTitle}>
          {category.name}
        </div>
        <button 
          style={{transform: `rotate(${isOpen ? '0' : '-90'}deg)`}} 
          className={styles.chevron}
        >
          {/* chevron */}
          <Image src="/down-chevron.png" layout="fixed" width="20" height="20" />
        </button>
      </div>
      <div style={{maxHeight: `${isOpen ? '300px': '0'}`}} className={styles.accordContent}>
        {
            category.products && category.products.length
            ? category.products.map((product, index) => {
                return <CategoryProduct key={index+1} product={product} />
            })
            : ''
        }
        {/* <button className={styles.seeAll}>See All</button> */}
      </div>
    </div>
  )
}

const constructCategoriesData = (products) => {
    const categories = {};
    products.forEach(product => {
        if (!categories[product.fields['Name (from Categories)']]) {
            categories[product.fields['Name (from Categories)']] = [];
            categories[product.fields['Name (from Categories)']].push(product);
        } else {
            categories[product.fields['Name (from Categories)']].push(product);
        }
    });

    const categoryData = [];
    for (let category in categories) {
        categoryData.push({
            name: category,
            products: categories[category]
        });
    }

    return categoryData;
}

const checkStock = (product) => {
  let stockAvailable = false;
  if (product.variantPrice && product.variantPrice.length) {
    product.variantPrice.forEach(variant => {
      if (variant.stockAvailable > 0) {
        stockAvailable = true;
      }
    });
  }
  return stockAvailable;
}

const SideBar = ({isHamOpen, products, loading}) => {
    // products = constructCategoriesData(products);
    products = products.filter(product => checkStock(product));

    return (
      <aside className={styles.sideBar+' '+(isHamOpen ? styles.sideBarOpen : '' )}>
        <div className={styles.sideBarContainer}>
          {
            loading ?
              <div className={styles.sidebarLoadingContainer}>
                <Loader
                  type="Oval"
                  color="#ccc"
                  height={40}
                  width={40}
                  timeout={3000} //3 secs
                />
              </div>
            : products.map((product, index) => {
              return <CategoryProduct key={index+1} product={product} />
            })
          }
        </div>
      </aside>
    );
}

export default SideBar
