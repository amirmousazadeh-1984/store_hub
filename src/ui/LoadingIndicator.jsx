import styles from "./LoadingIndicator.module.css";

const LoadingIndicator = () => {
  return (
    <div className={styles.loading_container}>
      <div className={styles.loading_bar}></div>
    </div>
  );
};

export default LoadingIndicator;
