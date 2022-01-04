import styles from './returns.module.css';
import Footer from "../../components/Footer";
import { getStore } from "../../services/backend/serverSideProps";

export async function getServerSideProps(context) {
    return getStore(context);
}
  
const Returns = (props) => {
    const { storeData } = props;
    const { returns } = storeData.legal;
    return (
        <div className={styles.container}>
            <main>
                <h2 className={styles.headline}>Returns</h2>
                {returns.trim() != "" ? 
                    <div 
                        className={styles.content}
                        dangerouslySetInnerHTML={{ __html: returns }}    
                    ></div> : null}
            </main>
            <Footer />
        </div>
    )
}

export default Returns;
