import React from "react";
import "./ChevronIcon.css"; // فایل استایل CSS

const ChevronIcon = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 40 40"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 10 L22 20 L12 30" // لایه اول
      className="chevron-path"
    />
    <path
      d="M14 10 L24 20 L14 30" // لایه دوم با فاصله ۲ پیکسل
      className="chevron-path"
    />
    <path
      d="M16 10 L26 20 L16 30" // لایه سوم با فاصله ۲ پیکسل
      className="chevron-path"
    />
  </svg>
);

export default ChevronIcon;
