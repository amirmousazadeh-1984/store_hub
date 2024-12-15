import React, { useState } from "react";
import PropTypes from "prop-types";
import useSendRating from "./useRating"; // به روز رسانی مسیر

const RatingComponent = ({ userId }) => {
  const [rating, setRating] = useState(0);
  const mutation = useSendRating(); // استفاده از mutation برای ارسال امتیاز

  const handleSubmit = () => {
    mutation.mutate({ userId, rating }); // ارسال امتیاز به Supabase
  };

  return (
    <div>
      <label>Rate this chat: </label>
      <input
        type="number"
        min="1"
        max="5"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

RatingComponent.propTypes = {
  userId: PropTypes.string.isRequired, // فقط userId نیاز داریم، chatId الزامی نیست
};

export default RatingComponent;
