import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddReview } from "./useReview";
import PropTypes from "prop-types";
import styles from "./ReviewForm.module.css";

const ReviewForm = ({ productId, onReviewSubmitted }) => {
  const addReview = useAddReview();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userId = useSelector((state) => state.user.user?.id);
  const username = useSelector((state) => state.user.user?.username); // نام کاربر را از وضعیت دریافت کنید

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !productId || !reviewText || rating === 0) {
      console.error("Missing required fields", {
        userId,
        productId,
        reviewText,
        rating,
      });
      return;
    }

    try {
      await addReview
        .mutateAsync({
          productId,
          text: reviewText,
          userId,
          rating,
          username,
        })
        .unwrap();
      onReviewSubmitted();
      setReviewText("");
      setRating(0);
      setSuccessMessage("Your review has been submitted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error submitting review:", error.message);
    }
  };

  return (
    <>
      <h1 className={styles.title}>
        <h3>With customers</h3>
        <p>
          - Share your valuable opinions about our products with us so that we
          can improve the quality of our products and services.
        </p>
        <p>
          - The best incentive for sellers and manufacturers is customer
          satisfaction with services and goods.
        </p>
        <p>- We are very grateful for your kind opinion.</p>
      </h1>

      <form onSubmit={handleSubmit} className={styles.reviewForm}>
        <textarea
          name="review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
          placeholder="Write your review..."
          className={styles.textarea}
        />
        <div className={styles.ratingContainer}>
          <div className={styles.ratestarcontainer}>
            <label>Rating:</label>
            <div className={styles.starContainer}>
              {Array.from({ length: 5 }, (_, index) => (
                <span
                  key={index + 1}
                  className={`${styles.star} ${
                    index < rating ? styles.filled : styles.empty
                  }`}
                  onMouseEnter={() => setRating(index + 1)}
                  onMouseLeave={() => setRating(rating)}
                  onClick={() => setRating(index + 1)}
                  title={`Rate ${index + 1} star${index === 0 ? "" : "s"}`}
                >
                  <div
                    className={styles.starIcon}
                    style={{
                      backgroundColor: index < rating ? "#f87171" : "#ccc",
                    }}
                  ></div>
                </span>
              ))}
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit Review
          </button>
        </div>
        {successMessage && (
          <div className={styles.successMessage}>{successMessage}</div>
        )}
      </form>
    </>
  );
};

ReviewForm.propTypes = {
  productId: PropTypes.number.isRequired,
  onReviewSubmitted: PropTypes.func.isRequired,
};

export default ReviewForm;
