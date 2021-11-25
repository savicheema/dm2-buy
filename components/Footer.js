import styles from "./footer.module.css";
import { getSubDomainOfPage } from "../services/helper";
import Link from 'next/link';

const Footer = () => {
  const navigateToHome = () => {
    const subdomain = getSubDomainOfPage();
    const url = `https://dm2buy.com?utm_source=footer&utm_campaign=${subdomain}`;
    window.open(url, '_blank').focus();
  };
  return (
    <footer className={styles.footer} onClick={navigateToHome}>
      {/* <Image src="/instagram-4.png" width="24" height="24" /> */}
      <div className={styles.tagline}>dm2buy</div>
      <div className={styles.footerLinks}>
          <Link href="/terms">
            Terms
          </Link>
          <Link href="">
            Returns
          </Link>
          <Link href="">
            Privacy Policy
          </Link>
          <Link href="">
            Contact us
          </Link>
      </div>
    </footer>
  );
};

export default Footer;
