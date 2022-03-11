import React from 'react';
import styles from './product-size-fields.module.css';

const ProductSizeFields = ({ selectedSize, sizeVariants, updateSelectedSize }) => {
    let selected = selectedSize;
    if (!selected) {
        selected = sizeVariants[0].fields['name'];
    }
    return (
        <div className={styles.productSizeContainer}>
            <div className={styles.sizeHeading}>SIZE</div>
            <div className={styles.sizesContainer}>
                {
                    sizeVariants.map((sizeVariant, index) => {
                        return <div
                            key={index+1}
                            className={styles.sizeContainer + ' ' + (selected === sizeVariant?.fields?.name ? styles.selected : '')}
                            style={index === 0 ? {marginLeft: 0} : (
                                index === sizeVariants.length - 1 ? {marginRight: 0} : {}
                            )}
                            onClick={() => updateSelectedSize(sizeVariant?.fields?.name)}>
                                {sizeVariant?.fields?.name}
                            </div>;
                    })
                }
            </div>
        </div>
    );
}

export default ProductSizeFields;