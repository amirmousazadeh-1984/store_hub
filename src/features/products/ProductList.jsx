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
import { useEffect, useState } from "react";
import styles from "./ProductList.module.css";
import Modal from "../../ui/Modal";
import LoadingIndicator from "../../ui/LoadingIndicator";
import IconsProduct from "../../ui/IconsProduct";
import Sidebar from "../../ui/Sidebar";
import Pagination from "../../ui/Pagination";
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
import { FaBox, FaClipboardList, FaShoppingCart, FaTags } from "react-icons/fa";
import { setSelectedType as setSelectedTypeAction } from "../../redux/filterSlice";

function ProductList() {
  const navigate = useNavigate();
  const { isLoading, products = [], error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviewsData, setReviewsData] = useState({});
  const [selectedType, setSelectedType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // مدیریت مدال ایجاد محصول
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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
    if (e.target === e.currentTarget) {
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

  // مدیریت صفحه‌بندی
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedMake, selectedColor, minPrice, maxPrice]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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

  useEffect(() => {
    paginatedProducts.forEach((product) => {
      if (!reviewsData[product.id]) {
        fetchReviewsForProduct(product.id);
      }
    });
  }, [paginatedProducts, reviewsData]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        return <CreateCar />;
      case "electronics":
        return <CreateElectronics />;
      case "computers":
        return <CreateComputer />;
      case "mobiles":
        return <CreateMobile />;
      case "home":
        return <CreateHome />;
      case "clothing":
        return <CreateCloth />;
      case "kitchenware":
        return <CreateKitchenware />;
      case "books":
        return <CreateBook />;
    }
  };
  return (
    <>
      <>
        {!isModalOpen && (
          <button onClick={openModal} className={styles.createButton}>
            Create New Product
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
                {paginatedProducts.map((product) => (
                  <li key={product.id} className={styles.productCard}>
                    <h2>
                      <span className={styles.span1}>P.Nmae: </span>
                      <span className={styles.span2}>{product.name} </span>
                      <div className={styles.pendingLabel}>
                        <FaShoppingCart />
                      </div>
                    </h2>

                    <img
                      src={getImageUrl(product.image)}
                      alt={product.name}
                      className={styles.productImage}
                    />
                    {product.type === "books" ? (
                      <>
                        <h3>
                          <span className={styles.span1}>Publisher Name: </span>
                          <span className={styles.span2}>
                            {product.publisher}
                          </span>
                        </h3>
                        <h3>
                          <span className={styles.span1}>Author: </span>
                          <span className={styles.span2}>{product.author}</span>
                        </h3>
                      </>
                    ) : (
                      <>
                        <h3>
                          <span className={styles.span1}>Company Nmae: </span>
                          <span className={styles.span2}>{product.make}</span>
                        </h3>
                        {product.model && (
                          <h3>
                            <span className={styles.span1}>Model: </span>
                            <span className={styles.span2}>
                              {product.model}
                            </span>
                          </h3>
                        )}
                      </>
                    )}

                    <IntlProvider locale="en">
                      <span className={styles.unitprice}>
                        <span className={styles.span1}>Unit Price: </span>
                        <span className={styles.number}>
                          <FormattedNumber
                            value={product.price}
                            style="currency"
                            currency="USD"
                          />
                        </span>
                      </span>
                    </IntlProvider>

                    <div className={styles.AverageRating}>
                      <AverageRating reviews={reviewsData[product.id] || []} />
                    </div>

                    <div className={styles.showCarButton}>
                      <button
                        onClick={() => setSelectedProduct(product)}
                        className={styles.showcar}
                      >
                        Show Product Detail
                      </button>
                      <button
                        onClick={() => navigate(`/products/${product.id}`)}
                        className={styles.ordercar}
                      >
                        Order Product
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
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
              <div className={styles.modal}>{getCreateProductModal()}</div>
            </div>
          )}
        </div>
      </>
    </>
  );
}
export default ProductList;
