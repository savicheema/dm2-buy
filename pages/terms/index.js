import styles from './terms.module.css';
import Footer from "../../components/Footer";
import { getStore } from "../../services/backend/serverSideProps";

export async function getServerSideProps(context) {
    return getStore(context);
}
  
const terms = (props) => {
    const { storeData } = props;
    const { terms } = storeData.fields;
    return (
        <div className={styles.container}>
            <main>
                <h2 className={styles.headline}>Terms</h2>
                <div className={styles.content}>
                    {terms}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default terms
