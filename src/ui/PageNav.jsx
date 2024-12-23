import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./PageNav.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { useState, useEffect } from "react";
import { MdPerson } from "react-icons/md";
import { IoIosSunny, IoMdMoon } from "react-icons/io";
import Sidebar from "./Sidebar";
import Logo from "./Logo";

function PageNav() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [isProductsMenuOpen, setIsProductsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const selectedType = useSelector((state) => state.filters.selectedType);
  const location = useLocation(); // اضافه کردن useLocation

  const showSidebar =
    location.pathname === "/products" || // اضافه کردن مسیرهای مورد نظر
    location.pathname === "/products/cars" ||
    location.pathname === "/products/homes" ||
    location.pathname === "/products/books" ||
    location.pathname === "/products/electronics" ||
    location.pathname === "/products/computers" ||
    location.pathname === "/products/mobiles" ||
    location.pathname === "/products/clothing" ||
    location.pathname === "/products/kitchenware";
  useEffect(() => {
    const savedTheme = localStorage.getItem("dark-mode");
    if (savedTheme === "enabled") {
      document.documentElement.classList.add("dark-mode");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "disabled");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "enabled");
      setIsDarkMode(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(`.${styles.hamburgerMenu}`) &&
        !event.target.closest(`.${styles.menuList}`)
      ) {
        setIsMenuOpen(false);
      }

      if (
        isProductsMenuOpen &&
        !event.target.closest(`.${styles.productsMenu}`) &&
        !event.target.closest(`.${styles.subMenu}`)
      ) {
        setIsProductsMenuOpen(false);
      }
    };

    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        setIsProductsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isMenuOpen, isProductsMenuOpen]);

  useEffect(() => {
    if (user) {
      const savedImage = localStorage.getItem(`profile_picture_${user.id}`);
      if (savedImage) {
        setProfilePicture(savedImage);
      } else {
        setProfilePicture(null);
      }
    }
  }, [user]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem(`cartItems-${localStorage.getItem("userId")}`);
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      <nav className={styles.navtotlal}>
        <div className={styles.nav}>
          <Link to="/" className={styles.car_center}>
            <Logo />
          </Link>

          <div className={styles.sidebar}>
            {showSidebar && (
              <div>
                <Sidebar
                  className={styles.sidebar}
                  selectedType={selectedType}
                />
              </div>
            )}
          </div>

          <div className={styles.totalrightside}>
            {" "}
            <button className={styles.darkModeToggle} onClick={toggleDarkMode}>
              {isDarkMode ? <IoIosSunny /> : <IoMdMoon />}
            </button>
            <div>
              <div
                className={styles.rightside}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu();
                }}
              >
                <div className={styles.hamburgerMenu}>
                  <div
                    className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
                  ></div>
                  <div
                    className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
                  ></div>
                  <div
                    className={`${styles.bar} ${isMenuOpen ? styles.open : ""}`}
                  ></div>
                </div>

                <div className={styles.profileContainer}>
                  {user ? (
                    <div className={styles.linkNoDecoration}>
                      {profilePicture ? (
                        <img
                          src={profilePicture}
                          alt="Profile"
                          className={styles.profileImage}
                        />
                      ) : (
                        <MdPerson className={styles.profileImage} />
                      )}
                    </div>
                  ) : (
                    <MdPerson className={styles.profileImage} />
                  )}
                </div>
              </div>

              <ul
                className={`${styles.menuList} ${
                  isMenuOpen ? styles.active : ""
                }`}
              >
                {user ? (
                  <div className={styles.loginsignup}>
                    <li>
                      <span onClick={handleLogout} className={styles.logout}>
                        Logout
                      </span>
                    </li>
                  </div>
                ) : (
                  <div className={styles.loginsignup}>
                    <li>
                      <span
                        onClick={() => navigate("/login?mode=signup")}
                        className={styles.signup}
                      >
                        Signup
                      </span>
                    </li>
                    <li>
                      <span
                        onClick={() => navigate("/login?mode=login")}
                        className={styles.loginstyle}
                      >
                        Login
                      </span>
                    </li>
                  </div>
                )}
                <li>
                  <NavLink to="/" activeClassName={styles.activenav}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard" activeClassName={styles.activenav}>
                    Dashboard
                  </NavLink>
                </li>
                {user && (
                  <>
                    <li>
                      <NavLink
                        to="/user-profile"
                        activeClassName={styles.activenav}
                      >
                        UserProfile
                      </NavLink>
                    </li>
                    <li>
                      <span
                        onClick={() =>
                          setIsProductsMenuOpen(!isProductsMenuOpen)
                        }
                        className={styles.productsMenu}
                      >
                        Products
                      </span>
                      {isProductsMenuOpen && (
                        <ul className={styles.subMenu}>
                          <li>
                            <NavLink
                              to="/products?type=home"
                              activeClassName={styles.activenav}
                            >
                              Homes
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/products?type=cars"
                              activeClassName={styles.activenav}
                            >
                              Cars
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/products?type=electronics"
                              activeClassName={styles.activenav}
                            >
                              Electronics
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/products?type=computers"
                              activeClassName={styles.activenav}
                            >
                              Computers
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/products?type=mobiles"
                              activeClassName={styles.activenav}
                            >
                              Mobiles
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/products?type=books"
                              activeClassName={styles.activenav}
                            >
                              Books
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/products?type=clothing"
                              activeClassName={styles.activenav}
                            >
                              Clothing
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              to="/products?type=kitchenware"
                              activeClassName={styles.activenav}
                            >
                              Kitchenware
                            </NavLink>
                          </li>
                        </ul>
                      )}
                    </li>
                    <li>
                      <NavLink to="/orders" activeClassName={styles.activenav}>
                        Orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/purchased-products"
                        className={({ isActive }) =>
                          isActive
                            ? `${styles.activenav} ${styles.navLink}`
                            : styles.navLink
                        }
                      >
                        Purchased Products
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default PageNav;
