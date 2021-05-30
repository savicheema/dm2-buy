import Image from "next/image";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.poweredBy}>powered by</div>

      <span className={styles.tagline}>dm2buy</span>
    </footer>
  );
};

export default Footer;
