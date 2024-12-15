// Breadcrumb.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Breadcrumb.module.css";

function Breadcrumb() {
  const location = useLocation();

  // مسیر فعلی را بدست می‌آوریم و به بخش‌های جداگانه تقسیم می‌کنیم
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav className={styles.breadcrumb}>
      <ul>
        {/* لینک به صفحه اصلی */}
        <li>
          <Link to="/">Home</Link>
        </li>

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return (
            <li key={to}>
              <Link to={to}>{value}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Breadcrumb;
