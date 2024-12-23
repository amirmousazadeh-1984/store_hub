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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showMakeFilter, setShowMakeFilter] = useState(false);
  const [showColorFilter, setShowColorFilter] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const cars = products.filter((product) => product.type === "cars");

  const hasActiveFilters = !!(
    selectedMake.length > 0 ||
    selectedColor.length > 0 ||
    minPrice ||
    maxPrice
  );

  const toggleMakeSelection = (make, e) => {
    e.stopPropagation();
    const updatedMakes = selectedMake.includes(make)
      ? selectedMake.filter((m) => m !== make)
      : [...selectedMake, make];
    dispatch(setSelectedMake(updatedMakes));
  };

  const toggleColorSelection = (color, e) => {
    e.stopPropagation();
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
    setIsFilterOpen(false);
  };

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
          <button className={styles.searchIcon}>
            <FaSearch />
          </button>
        </div>
        
        <div className={styles.filterContainer}>
          <button
            className={`${styles.filterToggleButton_1} ${
              hasActiveFilters ? styles.activeFilter : ""
            }`}
            onClick={() => setIsFilterOpen((prev) => !prev)}
          >
            {isFilterOpen ? (
              <MdClose className={styles.filterIcon} />
            ) : (
              <FiFilter className={styles.filterIcon} />
            )}
          </button>

          {isFilterOpen && (
            <div className={styles.filterGroup}>
              <div className={styles.filter_3}>
                {selectedType === "cars" && (
                  <>
                    <div className={styles.filterItem}>
                      <button
                        className={`${styles.filterToggleButton} ${
                          selectedMake.length > 0 ? styles.filtered : ""
                        }`}
                        onClick={() => setShowMakeFilter((prev) => !prev)}
                      >
                        Filter by Company
                      </button>
                      {showMakeFilter && (
                        <div className={styles.selectGroup}>
                          {Array.from(
                            new Set(cars.map((product) => product.make))
                          ).map((make) => (
                            <div
                              key={make}
                              className={`${styles.factoryItem} ${
                                selectedMake.includes(make) ? styles.selected : ""
                              }`}
                              onClick={(e) => toggleMakeSelection(make, e)}
                            >
                              {make}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={styles.filterItem}>
                      <button
                        className={`${styles.filterToggleButton} ${
                          selectedColor.length > 0 ? styles.filtered : ""
                        }`}
                        onClick={() => setShowColorFilter((prev) => !prev)}
                      >
                        Filter by Color
                      </button>
                      {showColorFilter && (
                        <div className={styles.selectGroup}>
                          {Array.from(
                            new Set(cars.map((product) => product.color))
                          ).map((color) => (
                            <div
                              key={color}
                              className={`${styles.factoryItem} ${
                                selectedColor.includes(color) ? styles.selected : ""
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

                <div className={styles.filterItem}>
                  <button
                    className={`${styles.filterToggleButton} ${
                      minPrice || maxPrice ? styles.filtered : ""
                    }`}
                    onClick={() => setShowPriceFilter((prev) => !prev)}
                  >
                    Filter by Price
                  </button>

                  {showPriceFilter && (
                    <div className={styles.priceInput}>
                      <div>
                        <label htmlFor="minPrice">Min Price:</label>
                        <input
                          type="number"
                          id="minPrice"
                          placeholder="Min Price"
                          value={minPrice}
                          onChange={(e) => dispatch(setMinPrice(e.target.value))}
                        />
                      </div>
                      <div>
                        <label htmlFor="maxPrice">Max Price:</label>
                        <input
                          type="number"
                          id="maxPrice"
                          placeholder="Max Price"
                          value={maxPrice}
                          onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                        />
                      </div>
                      <button
                        onClick={() => {
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

              {hasActiveFilters && (
                <div className={styles.buttonsWrapper}>
                  <button
                    className={styles.clearAllButton}
                    onClick={clearAllFilters}
                  >
                    Clear All Filters
                  </button>
                  <button
                    className={styles.applyButton}
                    onClick={() => setIsFilterOpen(false)}
                  >
                    Apply Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  selectedType: PropTypes.string,
};

export default Sidebar;
