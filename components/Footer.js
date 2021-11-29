import styles from "./footer.module.css";
import { getSubDomainOfPage } from "../services/helper";
import Link from 'next/link';
import { useStoreContext } from "../contexts/StoreDataContext";
import { useContext } from "react";

const Footer = () => {
  const storeData = useStoreContext();
  console.log({storeData})
  const navigateToHome = () => {
    const subdomain = getSubDomainOfPage();
    const url = `https://dm2buy.com?utm_source=footer&utm_campaign=${subdomain}`;
    window.open(url, '_blank').focus();
  };
  const { terms, contact, returns, privacy } = storeData.fields;

  return (
    <footer className={styles.footer}>
      {/* <Image src="/instagram-4.png" width="24" height="24" /> */}
      <div className={styles.tagline} onClick={navigateToHome}>dm2buy</div>
      <div className={styles.footerLinks}>
          {terms && (<Link href="/terms">
            Terms
          </Link>)}
          { returns && (<Link href="/returns">
            Returns
          </Link>)}
          { privacy && (<Link href="/privacy">
            Privacy
          </Link>)}
          { contact && (<Link href="/contact">
            Contact
          </Link>)}
      </div>
    </footer>
  );
};

export default Footer;
