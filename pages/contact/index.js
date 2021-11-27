import styles from './contact.module.css';
import Footer from "../../components/Footer";
import { getStore } from "../../services/backend/serverSideProps";

export async function getServerSideProps(context) {
    return getStore(context);
}
  
const Contact = (props) => {
    const { storeData } = props;
    const { contact } = storeData.fields;
    return (
        <div className={styles.container}>
            <main>
                <h2 className={styles.headline}>Contact Us</h2>
                <div className={styles.content}>
                    {contact}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default Contact
