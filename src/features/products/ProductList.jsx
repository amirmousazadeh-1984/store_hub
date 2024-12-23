import { useSelector, useDispatch } from "react-redux";
import {
  setSearchQuery,
  setMinPrice,
  setMaxPrice,
  setSelectedMake,
  setSelectedColor,
} from "../../redux/filterSlice";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useProducts } from "./useProducts";
import { useEffect, useState, useRef, useCallback } from "react";
import styles from "./ProductList.module.css";
import Modal from "../../ui/Modal";
import LoadingIndicator from "../../ui/LoadingIndicator";
import IconsProduct from "../../ui/IconsProduct";
import Sidebar from "../../ui/Sidebar";
import AverageRating from "../../ui/AverageRating";
import { getReviews } from "../../services/apiReview";
import { getImageUrl } from "../../services/apiProducts";
import CreateCar from "./CreateCar";
import CreateHome from "./CreateHome";
import CreateBook from "./CreateBook";
import CreateElectronics from "./CreateElectronics";
import CreateComputer from "./CreateComputer";
import CreateMobile from "./CreateMobile";
import CreateCloth from "./CreateCloth";
import CreateKitchenware from "./CreateKitchenware";
import { FormattedNumber, IntlProvider } from "react-intl";
import { FaBox, FaClipboardList, FaShoppingCart, FaTags, FaPlus } from "react-icons/fa";
import { setSelectedType as setSelectedTypeAction } from "../../redux/filterSlice";

function ProductList() {
  const navigate = useNavigate();
  const { isLoading, products = [], error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewsData, setReviewsData] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // مدیریت مدال ایجاد محصول
  const [searchParams] = useSearchParams();
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerLoad = 20;

  const dispatch = useDispatch();
  const {
    selectedColor,
    selectedMake,
    searchQuery,
    sortOption,
    minPrice,
    maxPrice,
  } = useSelector((state) => state.filters);

  // مدیریت فیلترها و ذخیره در localStorage
  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      dispatch(setSearchQuery(savedFilters.searchQuery || ""));
      dispatch(setMinPrice(savedFilters.minPrice || ""));
      dispatch(setMaxPrice(savedFilters.maxPrice || ""));
      dispatch(setSelectedMake(savedFilters.selectedMake || []));
      dispatch(setSelectedColor(savedFilters.selectedColor || []));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedTypeAction(selectedType)); // dispatch selectedType به Redux
  }, [selectedType, dispatch]);
  useEffect(() => {
    const filters = {
      searchQuery,
      minPrice,
      maxPrice,
      selectedMake,
      selectedColor,
    };
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [searchQuery, minPrice, maxPrice, selectedMake, selectedColor]);

  useEffect(() => {
    const typeFromUrl = searchParams.get("type");
    if (typeFromUrl) {
      setSelectedType(typeFromUrl);
    }
  }, [searchParams]);

  // مدیریت باز و بسته شدن مدال
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains(styles.modalOverlay)) {
      closeModal();
    }
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((product) =>
      selectedMake.length > 0 ? selectedMake.includes(product.make) : true
    )
    .filter((product) =>
      selectedColor.length > 0 ? selectedColor.includes(product.color) : true
    )
    .filter((product) => (selectedType ? product.type === selectedType : true))
    .filter((product) =>
      minPrice && !isNaN(minPrice)
        ? product.price >= parseFloat(minPrice)
        : true
    )
    .filter((product) =>
      maxPrice && !isNaN(maxPrice)
        ? product.price <= parseFloat(maxPrice)
        : true
    );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "price") {
      return a.price - b.price;
    }
    return 0;
  });

  const handleShowMore = () => {
    const currentLength = displayedProducts.length;
    const nextProducts = sortedProducts.slice(
      currentLength,
      currentLength + itemsPerLoad
    );
    setDisplayedProducts((prev) => [...prev, ...nextProducts]);
  };

  // Reset displayed products when filters change
  useEffect(() => {
    setDisplayedProducts(sortedProducts.slice(0, itemsPerLoad));
    setHasMore(sortedProducts.length > itemsPerLoad);
  }, [
    searchQuery,
    selectedMake,
    selectedColor,
    minPrice,
    maxPrice,
    selectedType,
    sortOption,
  ]);

  // Fetch reviews for displayed products
  useEffect(() => {
    displayedProducts.forEach((product) => {
      if (!reviewsData[product.id]) {
        fetchReviewsForProduct(product.id);
      }
    });
  }, [displayedProducts]);

  // دریافت نظرات محصولات
  const fetchReviewsForProduct = async (productId) => {
    try {
      const reviews = await getReviews(productId);
      setReviewsData((prevData) => ({
        ...prevData,
        [productId]: reviews,
      }));
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredCount = filteredProducts.length;

  const getCreateProductModal = () => {
    switch (selectedType) {
      case "cars":
        return <CreateCar onClose={closeModal} />;
      case "electronics":
        return <CreateElectronics onClose={closeModal} />;
      case "computers":
        return <CreateComputer onClose={closeModal} />;
      case "mobiles":
        return <CreateMobile onClose={closeModal} />;
      case "home":
        return <CreateHome onClose={closeModal} />;
      case "clothing":
        return <CreateCloth onClose={closeModal} />;
      case "kitchenware":
        return <CreateKitchenware onClose={closeModal} />;
      case "books":
        return <CreateBook onClose={closeModal} />;
    }
  };
  return (
    <>
      <>
        {!isModalOpen && (
          <button onClick={openModal} className={styles.createButton}>
            <FaPlus /> Create New Product
          </button>
        )}

        <IconsProduct setSelectedType={setSelectedType} />

        <div className={styles.totalpage}>
          <div
            className={`${styles.productlist} ${
              selectedProduct || isModalOpen ? styles.blurred : ""
            }`}
          >
            <div className={styles.totalProduct}>
              <ul>
                {displayedProducts.map((product) => (
                  <li key={product.id} className={styles.productCard}>
                    <div className={styles.imageWrapper}>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className={styles.showDetailsButton}
                      >
                        Show Details
                      </button>
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className={styles.productImage}
                        onClick={() => navigate(`/products/${product.id}`)}
                      />
                      <h2>
                        <span className={styles.productname}>
                          {product.name}{" "}
                        </span>
                        <div className={styles.AverageRating}>
                          <AverageRating
                            reviews={reviewsData[product.id] || ""}
                          />
                        </div>
                      </h2>
                    </div>

                    {product.type === "books" ? (
                      <>
                        <h3>
                          <span className={styles.span1}>
                            {product.publisher}{" "}
                          </span>
                        </h3>
                        <h3>
                          <span className={styles.span1}>{product.author}</span>
                        </h3>
                      </>
                    ) : (
                      <>
                        <h3>
                          <span className={styles.span1}>{product.make} </span>
                        </h3>
                        {product.model && (
                          <h3>
                            <span className={styles.span1}>
                              {product.model}
                            </span>
                          </h3>
                        )}
                      </>
                    )}

                    <IntlProvider locale="en">
                      <span className={styles.unitprice}>
                        <span className={styles.number}>
                          <FormattedNumber
                            value={product.price}
                            style="currency"
                            currency="USD"
                          />
                        </span>
                        <span className={styles.span2}>P.Unit </span>
                      </span>
                    </IntlProvider>
                  </li>
                ))}
              </ul>
              {displayedProducts.length < sortedProducts.length && (
                <button
                  onClick={handleShowMore}
                  className={styles.showMoreButton}
                >
                  Show More
                </button>
              )}
              {isLoading && <LoadingIndicator />}
            </div>
          </div>

          {selectedProduct && (
            <Modal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={handleOverlayClick}>
              <div className={styles.modalContent}>
                {getCreateProductModal()}
              </div>
            </div>
          )}
        </div>
      </>
    </>
  );
}
export default ProductList;
