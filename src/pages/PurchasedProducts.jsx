import styles from "./PurchasedProducts.module.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getImageUrl } from "../services/apiProducts";
import { FormattedNumber, IntlProvider } from "react-intl";
import { useStorePurchasedProducts } from "../services/apiPurchasedProducts";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { FaClipboardList, FaTruck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiReceiptRefund } from "react-icons/hi";

function PurchasedProducts() {
  const userId = useSelector((state) => state.user.id);
  const items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const purchasedProducts = items.filter(
    (item) => item.paid && item.userId === userId
  );

  const { mutate: storeProducts } = useStorePurchasedProducts();

  const [sentProducts, setSentProducts] = useState(() => {
    const savedSentProducts = localStorage.getItem("sentProducts");
    return savedSentProducts ? JSON.parse(savedSentProducts) : [];
  });

  const handleSendProduct = async (product) => {
    try {
      console.log("Sending product:", product);
      const response = await storeProducts([product]);
      console.log("Product stored successfully:", response);

      const updatedSentProducts = [...sentProducts, product.car.id];
      setSentProducts(updatedSentProducts);
      localStorage.setItem("sentProducts", JSON.stringify(updatedSentProducts));

      toast.success("Product sent successfully!");
    } catch (error) {
      console.error("Error storing product:", error.message);
      toast.error("Failed to send product.");
    }
  };

  useEffect(() => {
    const savedSentProducts = localStorage.getItem("sentProducts");
    if (savedSentProducts) {
      setSentProducts(JSON.parse(savedSentProducts));
    }
  }, []);

  const sentItems = purchasedProducts.filter((item) =>
    sentProducts.includes(item.car.id)
  );

  const pendingItems = purchasedProducts.filter(
    (item) => !sentProducts.includes(item.car.id)
  );

  if (purchasedProducts.length === 0) {
    return (
      <div className={styles.emptyCartMessagecontainer}>
        <div className={styles.emptyCartMessage}>
          <HiReceiptRefund className={styles.emptyCartIcon} />
          <h2>No Purchased Products</h2>
          <p>You haven't made any purchases yet. Start shopping to see your purchase history here!</p>
          <button
            onClick={() => navigate(`/dashboard`)}
            className={styles.backToDashboard}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* <h1 className={styles.header}>Purchased Products</h1> */}
      <div className={styles.orders}>
        {/* Pending Products Section */}
        <div className={styles.section}>
          <h1 className={styles.pending}>Pending Products</h1>
          {pendingItems.length === 0 ? (
            <div className={styles.allproduct}>
              <button className={styles.allproductb}>
                All products have been sent.(No item for Sending...)
              </button>
            </div>
          ) : (
            <div className={styles.wrapper}>
              {pendingItems.map(({ car, quantity, paymentId }) => (
                <div key={car.id} className={styles.property}>
                  <div className={styles.part_1}>
                    <div 
                      className={styles.image} 
                      onClick={() => handleSendProduct({ car, quantity, paymentId })}
                      role="button"
                      tabIndex={0}
                    >
                      <img src={getImageUrl(car.image)} alt={car.name} />
                    </div>
                    <div className={styles.productDetails}>
                      <h3 className={styles.productName}>{car.name}</h3>
                      <div className={styles.pendingLabel}>
                        <FaClipboardList />
                      </div>
                      
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>
                          {car.type === "books" ? "Publisher:" : "Company Name:"}
                        </span>
                        <span className={styles.infoValue}>
                          {car.type === "books" ? car.publisher : car.make}
                        </span>
                      </div>

                      <IntlProvider locale="en">
                        <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Unit Price:</span>
                          <span className={styles.priceValue}>
                          <FormattedNumber
                            value={car.price}
                            style="currency"
                            currency="USD"
                            className={styles.priceValue}
                          /></span>
                        </div>

                        <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Quantity:</span>
                          <span className={styles.infoValue}>{quantity}</span>
                        </div>

                        <div className={`${styles.infoRow} ${styles.totalPriceRow}`}>
                          <span className={styles.infoLabel}>Total Paid Price:</span>
                        <span className={styles.priceValue}>  <FormattedNumber
                            value={car.price * quantity}
                            style="currency"
                            currency="USD"
                            
                          />
                          </span>
                        </div>
                      </IntlProvider>

                      <div className={styles.paymentContainer}>
                        {paymentId ? (
                          <>
                            <span className={styles.paymentLabel}>Payment ID:</span>
                            <span className={styles.paymentValue}>{paymentId}</span>
                          </>
                        ) : (
                          <span>No Payment ID available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Sent Products Section */}
        <div className={styles.section}>
          <h1 className={styles.sending}>
            Products that have been sent to the customer's address
          </h1>
          {sentItems.length === 0 ? (
            <div className={styles.allproduct}>
              <button className={styles.allproductb}>
                No products have been sent yet.
              </button>
            </div>
          ) : (
            <div className={styles.wrapper}>
              {sentItems.map(({ car, quantity, paymentId }) => (
                <div
                  key={car.id}
                  className={`${styles.property} ${styles.sent}`}
                >
                  <div className={styles.sentLabel}>
                    <FaTruck />
                  </div>
                  <div className={styles.part_1}>
                    <div className={styles.image}>
                      <img src={getImageUrl(car.image)} alt={car.name} />
                    </div>
                    <div className={styles.productDetails}>
                      <h3 className={styles.productName}>{car.name}</h3>
                      
                      <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>
                          {car.type === "books" ? "Publisher:" : "Company Name:"}
                        </span>
                        <span className={styles.infoValue}>
                          {car.type === "books" ? car.publisher : car.make}
                        </span>
                      </div>

                      <IntlProvider locale="en">
                        <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Unit Price:</span>
                          <span  className={styles.priceValue}>
                          <FormattedNumber
                            value={car.price}
                            style="currency"
                            currency="USD"
                           
                          /></span>
                        </div>

                        <div className={styles.infoRow}>
                          <span className={styles.infoLabel}>Quantity:</span>
                          <span className={styles.infoValue}>{quantity}</span>
                        </div>

                        <div className={`${styles.infoRow} ${styles.totalPriceRow}`}>
                          <span className={styles.infoLabel}>Total Paid Price:</span>
                          <span  className={styles.priceValue}>


                          <FormattedNumber
                            value={car.price * quantity}
                            style="currency"
                            currency="USD"
                            className={styles.priceValue}
                            />
                            </span>
                        </div>
                      </IntlProvider>

                      <div className={styles.paymentContainer}>
                        {paymentId ? (
                          <>
                            <span className={styles.paymentLabel}>Payment ID:</span>
                            <span className={styles.paymentValue}>{paymentId}</span>
                          </>
                        ) : (
                          <span>No Payment ID available</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PurchasedProducts;
