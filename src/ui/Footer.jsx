import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <div className={styles.total}>
          <div>
            <p>Contact us:</p>
            <span>- Tell: 01-4676222229</span>
            <span>- Fax: 01-4676222222-8</span>
            <span>- Gamil: luxury_product_center@gmail.com</span>
            <span>- Telegram: @luxury_product_center</span>
          </div>
        </div>
        <h5>
          © Copyright 2017 by Jonas Schmedtmann. Feel free to use this project
          for your own purposes.
        </h5>
      </div>
    </footer>
  );
}

export default Footer;
