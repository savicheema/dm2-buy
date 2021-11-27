import styles from './privacypolicy.module.css';
import Footer from "../../components/Footer";
import { getStore } from "../../services/backend/serverSideProps";

export async function getServerSideProps(context) {
    return getStore(context);
}
  
const PrivacyPolicy = (props) => {
    const { storeData } = props;
    const { privacy } = storeData.fields;
    return (
        <div className={styles.container}>
            <main>
                <h2 className={styles.headline}>Privacy Policy</h2>
                <div className={styles.content}>
                    {privacy}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default PrivacyPolicy;
