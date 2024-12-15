import PropTypes from "prop-types";
import styles from "./AverageRating.module.css";

function AverageRating({ reviews }) {
  function calculateAverageRating(reviews) {
    if (!Array.isArray(reviews) || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  }

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
                "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)", // شکل ستاره
            }}
            title={`Rate ${i + 1} star${i === 0 ? "" : "s"}`}
          />
        ))}
      </div>
    );
  }

  const averageRating = calculateAverageRating(reviews); // محاسبه میانگین امتیاز

  return (
    <h5 className={styles.ratingContainer_1}>
      <span className={styles.span1}>Average Rating: {"  "} </span>

      <span className={styles.span23}>
        {Array.isArray(reviews) && reviews.length > 0 ? (
          <>
            {" "}
            {averageRating}
            <div className={styles.singleStar}></div>
          </>
        ) : (
          "N/A"
        )}
      </span>
    </h5>
  );
}

AverageRating.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      rating: PropTypes.number.isRequired,
    })
  ),
};

export default AverageRating;
