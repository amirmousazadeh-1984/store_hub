import PropTypes from "prop-types";
import styles from "./Modal.module.css";
import { getImageUrl } from "../services/apiProducts";
import { MdClose } from "react-icons/md";

function Modal({ product, onClose }) {
  return (
    <>
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <div className={styles.part_1}>
            <h2 className={styles.part_1h2}>{product.name}</h2>
            {product.type === "books" ? (
              <>
                <h3>
                  <span className={styles.span1}>Publisher: </span>
                  <span className={styles.span2}>{product.publisher}</span>
                </h3>
                <h4>
                  <span className={styles.span1}>Author: </span>
                  <span className={styles.span2}>{product.author}</span>
                </h4>
              </>
            ) : (
              <>
                <h3>
                  <span className={styles.span1}>Company: </span>
                  <span className={styles.span2}>{product.make}</span>
                </h3>
                {product.model && (
                  <h4>
                    <span className={styles.span1}>Model: </span>
                    <span className={styles.span2}>{product.model}</span>
                  </h4>
                )}
              </>
            )}
            <h4>
              <span className={styles.span1}>Unit Price: </span>
              <span className={styles.span2}>${product.price}</span>
            </h4>
          </div>
          <img src={getImageUrl(product.image)} alt={product.name} />

          <div className={styles.part_3}>
            <p className={styles.desc}>Description</p>
            {product.description ? (
              <p>
                <br></br> {product.description}
              </p>
            ) : (
              <p>No description available</p>
            )}
          </div>

          <button onClick={onClose} className={styles.closeButton}>
            <MdClose className={styles.filterIcon} />
          </button>
        </div>
      </div>
    </>
  );
}

// تعریف نوع props
Modal.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    publisher: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
  onClose: PropTypes.func.isRequired, // onClose باید یک تابع باشد
};

export default Modal;
