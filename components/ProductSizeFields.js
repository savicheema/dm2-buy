import React from 'react';
import styles from './product-size-fields.module.css';

const ProductSizeFields = ({ selectedSize, product, updateSelectedSize }) => {
    let selected = selectedSize;
    if (!selected) {
        selected = product.fields['sizeVariants'][0];
    }
    return (
        <div className={styles.productSizeContainer}>
            <div className={styles.sizeHeading}>SIZE</div>
            <div className={styles.sizesContainer}>
                {
                    product.fields['sizeVariants'].map((sizeVariant, index) => {
                        return <div
                            key={index+1}
                            className={styles.sizeContainer + ' ' + (selected === sizeVariant ? styles.selected : '')}
                            style={index === 0 ? {marginLeft: 0} : (
                                index === product.fields['sizeVariants'].length - 1 ? {marginRight: 0} : {}
                            )}
                            onClick={() => updateSelectedSize(sizeVariant)}>
                                {sizeVariant}
                            </div>;
                    })
                }
            </div>
        </div>
    );
}

export default ProductSizeFields;