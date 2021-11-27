import styles from './returns.module.css';
import Footer from "../../components/Footer";
import { getStore } from "../../services/backend/serverSideProps";

export async function getServerSideProps(context) {
    return getStore(context);
}
  
const Returns = (props) => {
    const { storeData } = props;
    const { returns } = storeData.fields;
    return (
        <div className={styles.container}>
            <main>
                <h2 className={styles.headline}>Returns</h2>
                <div className={styles.content}>
                    {returns}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Returns;
