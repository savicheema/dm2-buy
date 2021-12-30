import React from 'react';
import styles from "./basket.module.css";
import { getPrice } from "./../../services/frontend/pricing.service";
import BagItem from './BagItem';
import LoaderComponent from '../Loader';

export default class Basket extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            refresh: false
        };
    }

    removeProductFromCart = (productId) => () => {
        const cartData = this.props.cartData;
        const filteredProducts = cartData.products.filter((product) => product.id !== productId);
        if (filteredProducts.length === 0) {
            this.props.handleShowCart(false);
            if (!this.props.fromProductPage) this.props.setRefresh();
        }
        setTimeout(() => {
            cartData.products = filteredProducts;
            this.props.StorageManager.putJson(this.props.CART_KEY, cartData);
            if (this.props.fromProductPage) {
                this.props.setCart(cartData, true);
            } else {
                this.props.setCart(cartData);
            }
            this.setState({refresh: !this.state.refresh});
        }, 300);
    };
    
    updateProductCount = (productId, count) => {
        const cartData = this.props.cartData;
        const productIndex = cartData.products.findIndex(
            (product) => product.id === productId
        );
        if (productIndex < 0) return;

        cartData.products[productIndex].quantity = count;
        this.props.StorageManager.putJson(this.props.CART_KEY, cartData);
        this.props.setCart(cartData);
        this.setState({refresh: !this.state.refresh});
    };

    render() {
        const { productTotalPrice, shippingFee } = getPrice(this.props.cartData);
        const price = productTotalPrice - shippingFee;

        return (
            <aside className={styles.basketContainer + ' ' + (this.props.isBasketOpen ? styles.basketContainerOpen : '' )}>
                {this.state.loading && <LoaderComponent />}
                <div className={styles.bagContainer}>
                    <div className={styles.order}>
                    <h2 className={styles.orderTitle}>
                        <span>🛍️</span> Your Bag
                        <button className={styles.hamBtn} onClick={() => this.props.handleShowCart(!this.props.isBasketOpen)}>
                            <div className={this.props.isBasketOpen ? styles.open : null} >
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </h2>
                    <div className={styles.orderList}>
                        {this.props.cartData.products.map((product, index) => (
                        <BagItem
                            item={product}
                            removeProductFromCart={this.removeProductFromCart}
                            updateProductCount={this.updateProductCount}
                            key={index}
                        />
                        ))}
                    </div>
                    <div className={styles.empty_div}></div>
                    </div>
                    <div className={styles.bottomCTASection}>
                    <button
                        className={styles.orderButton}
                        onClick={async () => {
                        window.location.href = `/cart/checkout`;
                        }}
                    >
                        Checkout — ₹{price}
                    </button>
                    {/* <button
                        className={styles.continueShoppingButton}
                        onClick={() => this.props.handleShowCart(!this.props.isBasketOpen)}
                    >
                        Continue Shopping
                    </button> */}
                    </div>
                </div>
            </aside>
        );
    }
}