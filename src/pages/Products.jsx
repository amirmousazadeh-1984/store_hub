import ProductList from "../features/products/ProductList";
import styles from "./Products.module.css";

function Products() {
  return (
    <div className={styles.products}>
      <ProductList />
    </div>
  );
}

export default Products;
