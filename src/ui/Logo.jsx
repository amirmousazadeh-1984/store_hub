import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <div className={styles.logoIcon}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <path
            d="M4 8h24M4 8v16a2 2 0 002 2h20a2 2 0 002-2V8M4 8l2-4h20l2 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12v8M16 12v8M22 12v8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span className={styles.logoText}>
        Store<span className={styles.logoAccent}>Hub</span>
      </span>
    </div>
  );
};

export default Logo;
