import { useState } from "react";
import {
  setSearchQuery,
  setMinPrice,
  setMaxPrice,
  setSelectedMake,
  setSelectedColor,
} from "../redux/filterSlice";
import styles from "./Sidebar.module.css";
import { useProducts } from "../features/products/useProducts";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FiFilter } from "react-icons/fi";
import { MdClose } from "react-icons/md";

function Sidebar({ selectedType }) {
  const { products = [] } = useProducts();
  const dispatch = useDispatch();
  const { selectedColor, selectedMake, searchQuery, minPrice, maxPrice } =
    useSelector((state) => state.filters);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [showMakeFilter, setShowMakeFilter] = useState(false);
  const [showColorFilter, setShowColorFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const cars = products.filter((product) => product.type === "cars");

  const toggleMakeSelection = (make, e) => {
    e.stopPropagation(); // جلوگیری از بسته شدن منو
    const updatedMakes = selectedMake.includes(make)
      ? selectedMake.filter((m) => m !== make)
      : [...selectedMake, make];
    dispatch(setSelectedMake(updatedMakes));
  };

  const toggleColorSelection = (color, e) => {
    e.stopPropagation(); // جلوگیری از بسته شدن منو
    const updatedColors = selectedColor.includes(color)
      ? selectedColor.filter((c) => c !== color)
      : [...selectedColor, color];
    dispatch(setSelectedColor(updatedColors));
  };

  const clearAllFilters = () => {
    dispatch(setSelectedMake([]));
    dispatch(setSelectedColor([]));
    dispatch(setMinPrice(""));
    dispatch(setMaxPrice(""));
    dispatch(setSearchQuery(""));
  };

  const applyFilters = () => {
    setFiltersVisible(false); // فیلترها اعمال شده و منو بسته می‌شود
  };

  const hasActiveFilters = !!(
    selectedMake.length > 0 ||
    selectedColor.length > 0 ||
    minPrice ||
    maxPrice ||
    searchQuery
  );

  return (
    <div className={styles.sidebar}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search.."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          <FaSearch className={styles.searchIcon} />
        </div>

        <button
          className={`${styles.filterToggleButton_1} ${
            hasActiveFilters ? styles.filtered : ""
          }`}
          onClick={() => setFiltersVisible((prev) => !prev)}
        >
          {filtersVisible ? (
            <MdClose className={styles.filterIcon} />
          ) : (
            <FiFilter className={styles.filterIcon} />
          )}

          {filtersVisible && (
            <div className={styles.filterGroup}>
              <div className={styles.filter_3}>
                {selectedType === "cars" && (
                  <>
                    {/* فیلتر بر اساس شرکت سازنده */}
                    <div className={styles.filterItem}>
                      <button
                        className={`${styles.filterToggleButton} ${
                          selectedMake.length > 0 ? styles.filtered : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // جلوگیری از بسته شدن منو
                          setShowMakeFilter((prev) => !prev);
                        }}
                      >
                        {showMakeFilter
                          ? "Filter by Company"
                          : "Filter by Company"}
                      </button>
                      {showMakeFilter && (
                        <div className={styles.selectGroup}>
                          {Array.from(
                            new Set(cars.map((product) => product.make))
                          ).map((make) => (
                            <div
                              key={make}
                              className={`${styles.factoryItem} ${
                                selectedMake.includes(make)
                                  ? styles.selected
                                  : ""
                              }`}
                              onClick={(e) => toggleMakeSelection(make, e)}
                            >
                              {make}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* فیلتر بر اساس رنگ */}
                    <div className={styles.filterItem}>
                      <button
                        className={`${styles.filterToggleButton} ${
                          selectedColor.length > 0 ? styles.filtered : ""
                        }`}
                        onClick={(e) => {
                          e.stopPropagation(); // جلوگیری از بسته شدن منو
                          setShowColorFilter((prev) => !prev);
                        }}
                      >
                        {showColorFilter
                          ? "Filter by Color"
                          : "Filter by Color"}
                      </button>
                      {showColorFilter && (
                        <div className={styles.selectGroup}>
                          {Array.from(
                            new Set(cars.map((product) => product.color))
                          ).map((color) => (
                            <div
                              key={color}
                              className={`${styles.factoryItem} ${
                                selectedColor.includes(color)
                                  ? styles.selected
                                  : ""
                              }`}
                              onClick={(e) => toggleColorSelection(color, e)}
                            >
                              {color}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* فیلتر بر اساس قیمت */}
                <div className={styles.filterItem}>
                  <button
                    className={`${styles.filterToggleButton} ${
                      minPrice || maxPrice ? styles.filtered : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // جلوگیری از بسته شدن منو
                      setShowPriceFilter((prev) => !prev);
                    }}
                  >
                    {minPrice || maxPrice
                      ? "Filter by Price"
                      : "Filter by Price"}
                  </button>

                  {showPriceFilter && (
                    <div
                      className={styles.priceInput}
                      onClick={(e) => e.stopPropagation()} // جلوگیری از بسته شدن منو
                    >
                      <div>
                        <label htmlFor="minPrice">Min Price:</label>
                        <input
                          type="number"
                          id="minPrice"
                          placeholder="Min Price"
                          value={minPrice}
                          onChange={(e) => {
                            e.stopPropagation(); // جلوگیری از بسته شدن منو
                            dispatch(setMinPrice(e.target.value));
                          }}
                        />
                      </div>
                      <div>
                        <label htmlFor="maxPrice">Max Price:</label>
                        <input
                          type="number"
                          id="maxPrice"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => {
                            e.stopPropagation(); // جلوگیری از بسته شدن منو
                            dispatch(setMaxPrice(e.target.value));
                          }}
                        />
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // جلوگیری از بسته شدن منو
                          dispatch(setMinPrice(""));
                          dispatch(setMaxPrice(""));
                        }}
                        className={styles.clearbutton}
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* دکمه‌ها */}
              {hasActiveFilters && (
                <div className={styles.buttonsWrapper}>
                  <button
                    className={styles.clearAllButton}
                    onClick={(e) => {
                      e.stopPropagation(); // جلوگیری از بسته شدن منو
                      clearAllFilters();
                    }}
                  >
                    Clear All Filters
                  </button>

                  <button
                    className={styles.applyButton}
                    onClick={(e) => {
                      e.stopPropagation(); // جلوگیری از بسته شدن منو
                      applyFilters();
                    }}
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </button>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  selectedType: PropTypes.string,
};

export default Sidebar;
