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
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [address, setAddress] = useState("");

  const purchasedProducts = items.filter(
    (item) => item.paid && item.userId === userId
  );

  const { mutate: storeProducts } = useStorePurchasedProducts();

  const [sentProducts, setSentProducts] = useState(() => {
    const savedSentProducts = localStorage.getItem("sentProducts");
    return savedSentProducts ? JSON.parse(savedSentProducts) : [];
  });

  const [productAddresses, setProductAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem("productAddresses");
    return savedAddresses ? JSON.parse(savedAddresses) : {};
  });

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setShowAddressModal(true);
  };

  const handleAddressSubmit = async () => {
    if (!address.trim()) {
      toast.error("Please enter a valid address");
      return;
    }

    try {
      const response = await storeProducts([selectedProduct]);
      console.log("Product stored successfully:", response);

      const updatedSentProducts = [...sentProducts, selectedProduct.car.id];
      setSentProducts(updatedSentProducts);
      
      const updatedAddresses = {
        ...productAddresses,
        [selectedProduct.car.id]: address
      };
      setProductAddresses(updatedAddresses);
      
      localStorage.setItem("sentProducts", JSON.stringify(updatedSentProducts));
      localStorage.setItem("productAddresses", JSON.stringify(updatedAddresses));

      setShowAddressModal(false);
      setAddress("");
      setSelectedProduct(null);
      toast.success("Product sent successfully!");
    } catch (error) {
      console.error("Error storing product:", error.message);
      toast.error("Failed to send product.");
    }
  };

  useEffect(() => {
    const savedSentProducts = localStorage.getItem("sentProducts");
    const savedAddresses = localStorage.getItem("productAddresses");
    if (savedSentProducts) {
      setSentProducts(JSON.parse(savedSentProducts));
    }
    if (savedAddresses) {
      setProductAddresses(JSON.parse(savedAddresses));
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
      {showAddressModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Enter Delivery Address</h2>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address..."
              rows={4}
              className={styles.addressInput}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleAddressSubmit} className={styles.submitBtn}>
                Submit
              </button>
              <button
                onClick={() => {
                  setShowAddressModal(false);
                  setAddress("");
                  setSelectedProduct(null);
                }}
                className={styles.cancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
                      onClick={() => handleImageClick({ car, quantity, paymentId })}
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

                      <div className={styles.addressContainer}>
                        <span className={styles.addressLabel}>Delivery Address:</span>
                        <span className={styles.addressValue}>
                          {productAddresses[car.id] || "Address not available"}
                        </span>
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
