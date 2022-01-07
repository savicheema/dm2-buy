import styles from './terms.module.css';
import Footer from "../../components/Footer";
import { getStore } from "../../services/backend/serverSideProps";
import useLocalStorage from "./../../hooks/useLocalStorage";
import { CART_KEY } from "./../../services/frontend/StorageKeys";
import { initialCart } from "./../../services/ObjectsInitialValues";
import StorageManager from "./../../services/frontend/StorageManager";
import { useState } from 'react';
import Basket from "./../../components/Cart/Basket";
import NavBar from "./../../components/NavBar";

export async function getServerSideProps(context) {
    return getStore(context);
}
  
const terms = (props) => {
    const { storeData } = props;
    const { terms } = storeData.fields;
    const [cart, setCart] = useLocalStorage(CART_KEY, initialCart);
    const homePageEnabled = storeData?.fields?.homePageEnabled;
    const [homeActive, setHomeActive] = useState(homePageEnabled && homePageEnabled === 'true' ? true : false);
    const [open, setOpen] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [refresh, setRefresh] = useState(false);

    const updateHomeActive = (boolVal = false) => {
        setHomeActive(boolVal);
    }
    
    const handleShowCart = (boolVal = false) => {
        setShowCart(boolVal);
    }

    const handleRefresh = () => {
        setCart({
            products: [],
            shippingFee: 0,
            shippingFeeCap: 0
        });
    }

    return (
        <div className={styles.container}>
            <Basket
                setRefresh={handleRefresh}
                isBasketOpen={showCart}
                setCart={setCart}
                cartData={cart}
                StorageManager={StorageManager}
                CART_KEY={CART_KEY}
                handleShowCart={handleShowCart}/>
            {
                !showCart
                && <NavBar
                cartActive={cart.products.length ? true : false}
                handleShowCart={handleShowCart}
                hideInAdvance={false}
                homeActive={homePageEnabled && homePageEnabled === 'true' ? true : false}
                storeName={storeData?.fields?.store_name || ''}
                />
            }
            <main>
                <h2 className={styles.headline}>Terms & Conditions</h2>
                {terms.trim() != "" ? 
                    <div 
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: terms }}    
                    ></div> : null}
            </main>
            <Footer />
        </div>
    )
}

export default terms
