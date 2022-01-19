import styles from "./index.module.css"
import Image from "next/image";
import { useState } from "react";

const CategoryProduct = ({product}) => {
  return (
    <div
        onClick={() => {
            window.location.href = `/product/${product.fields.Slug}-${product.id}`;
        }}
        className={styles.productContainer}>
      <Image className={styles.categoryProductImage} src={product?.fields?.header_photo[0]?.url} layout="fixed" width="60" height="60" />
      <div className={styles.productDesc}>
        <h4 className={styles.productTitle}>
          {product?.fields?.Name}
        </h4>
        <span className={styles.productPrice}>
          {String.fromCharCode(0x20b9)}{product?.fields?.Price}
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

const SideBar = ({isHamOpen, products, loading}) => {
    products = constructCategoriesData(products);

    return (
        <aside className={styles.sideBar+' '+(isHamOpen ? styles.sideBarOpen : '' )}>
            <div className={styles.sideBarContainer}>
                {
                    products.map((category, index) => {
                        return <CategoryAccordian category={category} key={index+1} />;
                    })
                }
            </div>
        </aside>
    );
}

export default SideBar
