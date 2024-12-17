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
        <button
          className={styles.emptyCartMessage}
          onClick={() => navigate(`/dashboard`)}
        >
          PurchasedProducts List Is Empty / Back to Dashboard Page
        </button>
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
                    {" "}
                    <h3>
                      <span className={styles.part1}>
                        P.Name:
                        <span className={styles.part2}> {car.name}</span>
                      </span>
                    </h3>
                    <div className={styles.image}>
                      <img src={getImageUrl(car.image)} alt={car.name} />
                    </div>
                    <div className={styles.part_2}>
                      <div className={styles.pendingLabel}>
                        <FaClipboardList />
                        {/* <AiOutlineClockCircle /> */}
                      </div>
                      <span className={styles.part1}>
                        {" "}
                        {car.type === "books" ? (
                          <>
                            <span>
                              <span className={styles.part1}>Publisher: </span>
                              <span className={styles.part2}>
                                {car.publisher}
                              </span>
                            </span>
                          </>
                        ) : (
                          <>
                            <span>
                              <span className={styles.part1}>
                                Company Name:{" "}
                              </span>
                              <span className={styles.part2}>{car.make}</span>
                            </span>
                          </>
                        )}
                      </span>
                      <IntlProvider locale="en">
                        <span>
                          <span className={styles.part1}>Unit Price: </span>
                          <span className={styles.part2}>
                            <FormattedNumber
                              value={car.price}
                              style="currency"
                              currency="USD"
                              className={styles.number}
                            />
                          </span>
                        </span>{" "}
                        <span className={styles.part1}>
                          Quantity:
                          <span className={styles.part2}>{quantity}</span>
                        </span>
                        <span className={styles.totalprice}>
                          <span className={styles.part1}>
                            Total Paid Price:{" "}
                          </span>

                          <FormattedNumber
                            value={car.price * quantity}
                            style="currency"
                            currency="USD"
                            className={styles.number}
                          />
                        </span>
                      </IntlProvider>
                      <div className={styles.payid}>
                        {paymentId ? (
                          <>
                            <span className={styles.paymentId}>
                              Payment ID:
                            </span>
                            <span className={styles.paymentId1}>
                              {paymentId}
                            </span>
                          </>
                        ) : (
                          <span>No Payment ID available</span>
                        )}
                      </div>

                      <div className={styles.buttonWrapper}>
                        <button
                          onClick={() =>
                            handleSendProduct({ car, quantity, paymentId })
                          }
                          className={styles.pendingButton}
                        >
                          Product delivery for shipment
                        </button>
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
                    {/* <FiTruck  /> */}
                    <FaTruck />
                  </div>
                  <div className={styles.part_1}>
                    <h3>
                      <span className={styles.part1}>
                        P_Name:
                        <span className={styles.part2}> {car.name}</span>
                      </span>
                    </h3>
                    <div className={styles.image}>
                      <img src={getImageUrl(car.image)} alt={car.name} />
                    </div>
                    <div className={styles.part_2}>
                      {car.type === "books" ? (
                        <>
                          <span>
                            <span className={styles.part1}>Publisher: </span>
                            <span className={styles.part2}>
                              {car.publisher}
                            </span>
                          </span>
                        </>
                      ) : (
                        <>
                          <span>
                            <span className={styles.part1}>Company Name: </span>
                            <span className={styles.part2}>{car.make}</span>
                          </span>
                        </>
                      )}
                      <IntlProvider locale="en">
                        <span>
                          <span className={styles.part1}>Unit Price: </span>
                          <span className={styles.part2}>
                            <FormattedNumber
                              value={car.price}
                              style="currency"
                              currency="USD"
                              className={styles.number}
                            />
                          </span>
                        </span>{" "}
                        <span className={styles.part1}>
                          Quantity:
                          <span className={styles.part2}>{quantity}</span>
                        </span>
                        <span className={styles.totalprice}>
                          <span className={styles.part1}>
                            Total Paid Price:{" "}
                          </span>
                          <FormattedNumber
                            value={car.price * quantity}
                            style="currency"
                            currency="USD"
                            className={styles.number}
                          />
                        </span>
                      </IntlProvider>
                      <div className={styles.payid}>
                        {paymentId ? (
                          <>
                            <span className={styles.paymentId}>
                              Payment ID:
                            </span>
                            <span className={styles.paymentId1}>
                              {paymentId}
                            </span>
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
