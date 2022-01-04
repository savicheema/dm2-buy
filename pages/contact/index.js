import styles from './contact.module.css';
import Footer from "../../components/Footer";
import { getStore } from "../../services/backend/serverSideProps";

export async function getServerSideProps(context) {
    return getStore(context);
}
  
const Contact = (props) => {
    const { storeData } = props;
    const { contacts } = storeData.legal;
    return (
        <div className={styles.container}>
            <main>
                <h2 className={styles.headline}>Contact Us</h2>
                {contacts.trim() != "" ? 
                    <div 
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: contacts }}    
                    ></div> : null}
            </main>
            <Footer />
        </div>
    )
}

export default Contact
