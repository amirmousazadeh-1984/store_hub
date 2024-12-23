import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import {
  MdHome,
  MdDirectionsCar,
  MdPhoneIphone,
  MdComputer,
  MdMenuBook,
  MdOutlineLocalMall,
  MdKitchen,
} from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import { Link } from "react-router-dom";
import styles from "./IconsProduct.module.css";

function IconsProduct({ setSelectedType }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentType = searchParams.get("type");

  return (
    <div className={styles.total}>
      <div className={styles.productListContainer}>
        <div className={styles.categoryIcons}>
          <Link
            to="/products?type=home"
            className={`${styles.iconLink} ${currentType === "home" ? styles.active : ""}`}
            onClick={() => setSelectedType("home")}
          >
            <MdHome className={styles.icon} />
            <span>Homes</span>
          </Link>
          <Link
            to="/products?type=cars"
            className={`${styles.iconLink} ${currentType === "cars" ? styles.active : ""}`}
            onClick={() => setSelectedType("cars")}
          >
            <MdDirectionsCar className={styles.icon} />
            <span>Cars</span>
          </Link>
          <Link
            to="/products?type=electronics"
            className={`${styles.iconLink} ${currentType === "electronics" ? styles.active : ""}`}
            onClick={() => setSelectedType("electronics")}
          >
            <FiMonitor className={styles.icon} />
            <span>Electronics</span>
          </Link>
          <Link
            to="/products?type=computers"
            className={`${styles.iconLink} ${currentType === "computers" ? styles.active : ""}`}
            onClick={() => setSelectedType("computers")}
          >
            <MdComputer className={styles.icon} />
            <span>Computers</span>
          </Link>
          <Link
            to="/products?type=mobiles"
            className={`${styles.iconLink} ${currentType === "mobiles" ? styles.active : ""}`}
            onClick={() => setSelectedType("mobiles")}
          >
            <MdPhoneIphone className={styles.icon} />
            <span>Mobiles</span>
          </Link>
          <Link
            to="/products?type=books"
            className={`${styles.iconLink} ${currentType === "books" ? styles.active : ""}`}
            onClick={() => setSelectedType("books")}
          >
            <MdMenuBook className={styles.icon} />
            <span>Books</span>
          </Link>
          <Link
            to="/products?type=clothing"
            className={`${styles.iconLink} ${currentType === "clothing" ? styles.active : ""}`}
            onClick={() => setSelectedType("clothing")}
          >
            <MdOutlineLocalMall className={styles.icon} />
            <span>Clothing</span>
          </Link>
          <Link
            to="/products?type=kitchenware"
            className={`${styles.iconLink} ${currentType === "kitchenware" ? styles.active : ""}`}
            onClick={() => setSelectedType("kitchenware")}
          >
            <MdKitchen className={styles.icon} />
            <span>Kitchenware</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

IconsProduct.propTypes = {
  setSelectedType: PropTypes.func.isRequired,
};

export default IconsProduct;
