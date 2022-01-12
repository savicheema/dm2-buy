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
