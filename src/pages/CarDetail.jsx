import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { useProduct } from "../features/products/useProduct";
import { useReviews } from "../features/review/useReview";
import styles from "./CarDetail.module.css";
import { getImageUrl } from "../services/apiProducts";
import ReviewForm from "../features/review/ReviewForm";
import AverageRating from "../ui/AverageRating";
import { addOrderApi } from "../services/apiOrders";
import { FormattedNumber, IntlProvider } from "react-intl";
import { FiShoppingCart } from "react-icons/fi";

function CarDetail() {
  const { id } = useParams();
  const { isLoading, car, error } = useProduct(id);
  const {
    data: reviews,
    isLoading: reviewsLoading,
    refetch,
  } = useReviews(car?.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(car?.price || 0);

  useEffect(() => {
    if (car) {
      setTotalPrice(quantity * car.price);
    }
  }, [quantity, car]);

  if (isLoading) return <div>Loading car details...</div>;
  if (error) return <div>{error.message}</div>;
  if (!car) return <div>No car data available.</div>;

  function handleQuantityChange(e) {
    const newQuantity = Math.max(1, e.target.value);
    setQuantity(newQuantity);
  }

  async function insertOrderToDatabase(car, quantity, totalPrice) {
    if (!user?.id) {
      alert("Please log in to add items to the cart.");
      navigate("/login");
      return;
    }

    try {
      await addOrderApi({
        productId: car.id,
        userId: user.id,
        quantity: quantity,
        totalPrice: totalPrice,
      });
      refetch();
    } catch (error) {
      console.error("Error placing order:", error.message);
    }
  }

  async function handleAddToCart() {
    if (isNaN(quantity) || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    dispatch(
      addToCart({
        car,
        quantity: parseInt(quantity),
        totalPrice,
        isPaid: false,
      })
    );

    await insertOrderToDatabase(car, quantity, totalPrice);

    navigate("/orders");
  }

  const handleReviewSubmitted = () => {
    refetch();
  };

  function renderStars(rating) {
    return (
      <div className={styles.starContainer}>
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i + 1}
            className={`${styles.star} ${
              i < rating ? styles.filled : styles.empty
            }`}
            style={{
              clipPath:
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
            title={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.total}>
      <div className={styles.cardetail}>
        <div className={styles.detail}>
          <div className={styles.part_1}>
            <h1 className={styles.part_1h1}>
              {car?.name || "Car name unavailable"}
            </h1>

            {car.type === "books" ? (
              <>
                <h3>
                  <span className={styles.span1}>Publisher: </span>
                  <span className={styles.span2}>{car.publisher || "N/A"}</span>
                </h3>
                <h4>
                  <span className={styles.span1}>Author: </span>
                  <span className={styles.span2}>{car.author || "N/A"}</span>
                </h4>
              </>
            ) : (
              <>
                <h3>
                  <span className={styles.span1}>Make Factory: </span>
                  <span className={styles.span2}>{car?.make || "N/A"}</span>
                </h3>
                {car.model && (
                  <h3>
                    <span className={styles.span1}>Model: </span>
                    <span className={styles.span2}>{car?.model || "N/A"}</span>
                  </h3>
                )}
              </>
            )}

            <h4>
              <IntlProvider locale="en">
                <h4 className={styles.unit}>
                  <span className={styles.span1}>Unit Price: </span>
                  <span className={styles.span2}>
                    <span className={styles.number1}>
                      <FormattedNumber
                        value={car?.price || "N/A"}
                        style="currency"
                        currency="USD"
                      />
                    </span>
                  </span>
                </h4>
              </IntlProvider>
            </h4>
            <div className={styles.ratingContainer_1}>
              <AverageRating reviews={reviews} />
            </div>
          </div>
          <img src={getImageUrl(car?.image)} alt={car?.name} />
          <div className={styles.description}>
            {car?.description ? (
              <>
                <h2>Description</h2>
                <p className={styles.description_p}>{car.description}</p>
              </>
            ) : (
              <h3>No description available</h3>
            )}
          </div>
        </div>
        <div className={styles.cartItem}>
          <div className={styles.iconLink}>
            <span className={styles.cartText}>Shopping Cart</span>
            <FiShoppingCart
              size={35}
              className={`${styles.icon} ${styles.cartIcon}`}
            />
          </div>
          <div className={styles.part2cart}>
            <div className={styles.input_1}>
              <p className={styles.quantity}>Quantity:</p>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className={styles.quantityInput}
              />
            </div>

            <IntlProvider locale="en">
              <p className={styles.unit}>
                <span className={styles.span1}>Unit Price: </span>
                <span className={styles.span2}>
                  <span className={styles.number1}>
                    <FormattedNumber
                      value={car?.price || 0}
                      style="currency"
                      currency="USD"
                    />
                  </span>
                </span>
              </p>

              <p className={styles.totalprice}>
                <span className={styles.span3}>Total Price: </span>
                <span className={styles.span4}>
                  <span className={styles.number2}>
                    <FormattedNumber
                      value={totalPrice}
                      style="currency"
                      currency="USD"
                    />
                  </span>
                </span>
              </p>
            </IntlProvider>
            <div className={styles.btn_group}>
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
                disabled={!car}
              >
                Add to Cart
              </button>
              <button
                className={styles.removeButton}
                onClick={() => navigate(`/products?type=${car.type}`)}
              >
                Check Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.description1}>
        <h3>Description</h3>
        <p>- Please be careful when choosing a product.</p>
        <p>
          - All specifications in the above boxes are based on the catalogs of
          the product manufacturers.
        </p>
        <p>
          - If there is a discrepancy in the product specifications, please
          contact the site administration.
        </p>
        <p>
          - Our colleagues are at the service of our valued customers 24 hours a
          day.
        </p>
        <p>
          - Our goal is to find friends who are satisfied with our products.
        </p>
      </div>
      <div className={styles.totalreview}>
        <div className={styles.reviews}>
          <ReviewForm
            productId={car?.id}
            onReviewSubmitted={handleReviewSubmitted}
            className={styles.rewr}
          />
          <h1 className={styles.UserReviews}>User Reviews</h1>
          {reviewsLoading ? (
            <p>Loading reviews...</p>
          ) : (
            <ul>
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  return (
                    <li key={review.id} className={styles.reviewItem}>
                      <strong className={styles.username}>
                        {review.username
                          ? ` ${review.username} :`
                          : "Anonymous"}
                      </strong>

                      <p className={styles.reviewText}>{review.text}</p>
                      <p className={styles.reviewUsername}></p>
                      <p className={styles.reviewStars}>
                        {renderStars(review.rating)}
                      </p>
                    </li>
                  );
                })
              ) : (
                <p className={styles.noreview}>No reviews yet.</p>
              )}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
