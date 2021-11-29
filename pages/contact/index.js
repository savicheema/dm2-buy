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
                {contact.trim() != "" ? 
                    <div 
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: contact }}    
                    ></div> : null}
            </main>
            <Footer />
        </div>
    )
}

export default Contact
