import Image from "next/image";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Image src="/instagram-4.png" width="24" height="24" />
      <span className={styles.tagline}>@dm2buydotcom</span>
    </footer>
  );
};

export default Footer;
