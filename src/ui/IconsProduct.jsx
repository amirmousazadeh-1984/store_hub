import PropTypes from "prop-types";
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
  return (
    <div className={styles.total}>
      <div className={styles.productListContainer}>
        <div className={styles.categoryIcons}>
          <Link
            to="/products?type=home"
            className={styles.iconLink}
            onClick={() => setSelectedType("home")}
          >
            <MdHome size={40} className={styles.icon} />
            <span>Homes</span>
          </Link>
          <Link
            to="/products?type=cars"
            className={styles.iconLink}
            onClick={() => setSelectedType("cars")}
          >
            <MdDirectionsCar size={40} className={styles.icon} />
            <span>Cars</span>
          </Link>
          <Link
            to="/products?type=electronics"
            className={styles.iconLink}
            onClick={() => setSelectedType("electronics")}
          >
            <FiMonitor size={40} className={styles.icon} />
            <span>Electronics</span>
          </Link>
          <Link
            to="/products?type=computers"
            className={styles.iconLink}
            onClick={() => setSelectedType("computers")}
          >
            <MdComputer size={40} className={styles.icon} />
            <span>Computers</span>
          </Link>
          <Link
            to="/products?type=mobiles"
            className={styles.iconLink}
            onClick={() => setSelectedType("mobiles")}
          >
            <MdPhoneIphone size={40} className={styles.icon} />
            <span>Mobiles</span>
          </Link>
          <Link
            to="/products?type=books"
            className={styles.iconLink}
            onClick={() => setSelectedType("books")}
          >
            <MdMenuBook size={40} className={styles.icon} />
            <span>Books</span>
          </Link>
          <Link
            to="/products?type=clothing"
            className={styles.iconLink}
            onClick={() => setSelectedType("clothing")}
          >
            <MdOutlineLocalMall size={40} className={styles.icon} />
            <span>Clothing</span>
          </Link>
          <Link
            to="/products?type=kitchenware"
            className={styles.iconLink}
            onClick={() => setSelectedType("kitchenware")}
          >
            <MdKitchen size={40} className={styles.icon} />
            <span>Kitchenware</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
IconsProduct.propTypes = {
  setSelectedType: PropTypes.func.isRequired, // تعریف اینکه باید تابع باشد و اجباری است
};

export default IconsProduct;
