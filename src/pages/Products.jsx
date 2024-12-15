import ProductList from "../features/products/ProductList";
import styles from "./Products.module.css";
import CreateCar from "../features/products/CreateCar";
// import { useState } from "react";

function Products() {
  return (
    <div className={styles.products}>
      <ProductList />

      {/* <CreateCar /> */}
    </div>
  );
}

export default Products;
