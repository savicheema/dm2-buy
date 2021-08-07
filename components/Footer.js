import styles from "./footer.module.css";
import { getSubDomainOfPage } from "../services/helper";

const Footer = () => {
  const navigateToHome = () => {
    const subdomain = getSubDomainOfPage();
    const url = `https://dm2buy.com?utm_source=footer&utm_campaign=${subdomain}`;
    window.open(url, '_blank').focus();
  };
  return (
    <footer className={styles.footer} onClick={navigateToHome}>
      {/* <Image src="/instagram-4.png" width="24" height="24" /> */}
      <span className={styles.tagline}>dm2buy</span>
    </footer>
  );
};

export default Footer;
