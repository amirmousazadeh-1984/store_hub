import { useNavigate } from "react-router-dom";
import DashboardIcons from "../ui/DashboardIcons";
import styles from "./Dashboard.module.css";
import { useState, useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [currentGallery, setCurrentGallery] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNavigation = (type) => {
    navigate(`/products?type=${type}`);
  };

  const galleries = [
    {
      name: "Home Collection",
      images: Array.from({ length: 14 }, (_, i) => `img/gal-${i + 1}.jpeg`),
      type: "home",
    },
    {
      name: "Car Collection",
      images: Array.from(
        { length: 14 },
        (_, i) => `img/${String(i + 1).padStart(3, "0")}.jpg`
      ),
      type: "cars",
    },
    {
      name: "Electronics Collection",
      images: Array.from({ length: 14 }, (_, i) => `img/${126 + i}.jpg`),
      type: "electronics",
    },
    {
      name: "Computer Collection",
      images: Array.from({ length: 14 }, (_, i) => `img/${161 + i}.jpg`),
      type: "computers",
    },
    {
      name: "Mobile Collection",
      images: Array.from({ length: 14 }, (_, i) => `img/${190 + i}.jpg`),
      type: "mobiles",
    },
    {
      name: "Book Collection",
      images: Array.from({ length: 14 }, (_, i) => `img/${301 + i}.jpg`),
      type: "books",
    },
    {
      name: "Clothes Collection",
      images: Array.from({ length: 14 }, (_, i) => `img/${330 + i}.jpg`),
      type: "clothing",
    },
    {
      name: "Kitchenware Collection",
      images: Array.from({ length: 14 }, (_, i) => `img/${357 + i}.jpg`),
      type: "kitchenware",
    },
  ];

  // Change slide every 5 seconds
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => {
        const nextSlide = prev + 1;
        if (nextSlide >= galleries[currentGallery].images.length) {
          // If we're at the last slide, change gallery
          setCurrentGallery(
            (prevGallery) => (prevGallery + 1) % galleries.length
          );
          return 0;
        }
        return nextSlide;
      });
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [currentGallery, galleries]);

  const currentGalleryData = galleries[currentGallery];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.mainContent}>
        <div className={styles.slideshow}>
          {currentGalleryData.images.map((img, index) => (
            <div
              key={img}
              className={`${styles.slide} ${
                index === currentSlide ? styles.active : ""
              }`}
            >
              <img
                src={img}
                alt={`${currentGalleryData.name} ${index + 1}`}
                className={styles.slideImage}
              />
              <div className={styles.slideContent}>
                <div className={styles.categoryIndicators}>
                  {galleries.map((gallery, idx) => (
                    <div
                      key={gallery.type}
                      className={`${styles.categoryDot} ${
                        idx === currentGallery ? styles.active : ""
                      }`}
                      onClick={() => {
                        setCurrentGallery(idx);
                        setCurrentSlide(0);
                      }}
                    />
                  ))}
                </div>
                <h2 className={styles.slideTitle}>{currentGalleryData.name}</h2>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progress} ${styles.active}`}
                    key={`${currentGallery}-${currentSlide}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.iconsColumn}>
          <DashboardIcons setSelectedType={handleNavigation} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
