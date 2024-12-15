import { useNavigate } from "react-router-dom";
import IconsProduct from "../ui/IconsProduct";
import styles from "./Dashboard.module.css";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (type) => {
    navigate(`/products?type=${type}`);
  };

  const [currentGallery, setCurrentGallery] = useState(0);

  const totalGalleries = 8;

  const handleNext = () => {
    if (currentGallery < totalGalleries - 1) {
      setCurrentGallery((prevGallery) => prevGallery + 1);
    }
  };

  const handlePrev = () => {
    if (currentGallery > 0) {
      setCurrentGallery((prevGallery) => prevGallery - 1);
    }
  };

  const galleries = [
    <Gallery1 key="gallery1" />,
    <Gallery2 key="gallery2" />,
    <Gallery3 key="gallery3" />,
    <Gallery4 key="gallery4" />,
    <Gallery5 key="gallery5" />,
    <Gallery6 key="gallery6" />,
    <Gallery7 key="gallery7" />,
    <Gallery8 key="gallery8" />,
  ];

  return (
    <>
      <div className={styles.Dashboard}>
        <IconsProduct setSelectedType={handleNavigation} />
      </div>
      <div className={styles.paragraphContainer}>
        <div className={styles.pargraph}>
          <h3>World's best luxury homes</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
            distinctio necessitatibus pariatur voluptatibus.
          </p>
        </div>
        <div className={styles.pargraph}>
          <h3>Only the best properties</h3>
          <p>
            Voluptatum mollitia quae. Vero ipsum sapiente molestias accusamus
            rerum sed a eligendi aut quia.
          </p>
        </div>
        <div className={styles.pargraph}>
          <h3>All homes in in top locations</h3>
          <p>
            Tenetur distinctio necessitatibus pariatur voluptatibus quidem
            consequatur harum.
          </p>
        </div>
        <div className={styles.pargraph}>
          <h3>New home in one week</h3>
          <p>
            Vero ipsum sapiente molestias accusamus rerum. Lorem, ipsum dolor
            sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className={styles.pargraph}>
          <h3>Top 1% realtors</h3>
          <p>
            Quidem consequatur harum, voluptatum mollitia quae. Tenetur
            distinctio necessitatibus pariatur voluptatibus.
          </p>
        </div>
        <div className={styles.pargraph}>
          <h3>Secure payments on nexter</h3>
          <p>
            Pariatur voluptatibus quidem consequatur harum, voluptatum mollitia
            quae.
          </p>
        </div>
      </div>

      <div className={styles.galleryContainer}>
        {currentGallery !== 0 && (
          <div className={styles.leftArrow} onClick={handlePrev}>
            &lt;
          </div>
        )}

        {galleries[currentGallery]}

        {currentGallery !== totalGalleries - 1 && (
          <div className={styles.rightArrow} onClick={handleNext}>
            &gt;
          </div>
        )}
      </div>
    </>
  );
}

function Gallery1() {
  return (
    <div className={styles.totalpage}>
      <h1 className={styles.homegallery}>Home_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/gal-1.jpeg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/gal-2.jpeg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/gal-3.jpeg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/gal-4.jpeg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/gal-5.jpeg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/gal-6.jpeg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/gal-7.jpeg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/gal-8.jpeg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/gal-9.jpeg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/gal-10.jpeg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/gal-11.jpeg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/gal-12.jpeg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/gal-13.jpeg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/gal-14.jpeg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </div>
  );
}

function Gallery2() {
  return (
    <>
      <h1 className={styles.homegallery}>Car_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/001.jpg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/002.jpg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/004.jpg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/005.jpg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/006.jpg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/008.jpg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/009.jpg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/010.jpg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/011.jpg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/012.jpg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/013.jpg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/014.jpg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/007.jpg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/003.jpg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </>
  );
}
function Gallery3() {
  return (
    <>
      <h1 className={styles.homegallery}>Electronic_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/126.jpg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/127.jpg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/128.jpg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/129.jpg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/130.jpg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/131.jpg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/132.jpg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/140.jpg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/134.jpg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/135.jpg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/136.jpg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/137.jpg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/138.jpg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/139.jpg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </>
  );
}
function Gallery4() {
  return (
    <>
      <h1 className={styles.homegallery}>Computer_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/161.jpg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/162.jpg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/163.jpg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/164.jpg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/165.jpg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/166.jpg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/167.jpg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/168.jpg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/169.jpg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/170.jpg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/171.jpg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/172.jpg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/173.jpg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/174.jpg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </>
  );
}
function Gallery5() {
  return (
    <>
      <h1 className={styles.homegallery}>Mobile_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/202.jpg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/203.jpg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/204.jpg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/205.jpg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/206.jpg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/207.jpg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/208.jpg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/209.jpg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/196.jpg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/195.jpg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/197.jpg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/198.jpg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/200.jpg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/190.jpg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </>
  );
}
function Gallery6() {
  return (
    <>
      <h1 className={styles.homegallery}>Book_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/302.jpg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/301.jpg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/303.jpg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/304.jpg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/305.jpg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/306.jpg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/307.jpg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/308.jpg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/309.jpg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/310.jpg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/311.jpg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/312.jpg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/313.jpg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/316.jpg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </>
  );
}
function Gallery7() {
  return (
    <>
      <h1 className={styles.homegallery}>Clothes_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/334.jpg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/336.jpg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/337.jpg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/338.jpg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/339.jpg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/348.jpg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/331.jpg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/342.jpg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/330.jpg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/345.jpg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/346.jpg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/349.jpg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/350.jpg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/347.jpg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </>
  );
}
function Gallery8() {
  return (
    <>
      <h1 className={styles.homegallery}>kitchenware_Gallery</h1>
      <section className={styles.gallery}>
        <figure className={`${styles.galleryItem} ${styles.galleryItem1}`}>
          <img
            src="img/357.jpg"
            alt="Gallery image 1"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem2}`}>
          <img
            src="img/360.jpg"
            alt="Gallery image 2"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem3}`}>
          <img
            src="img/361.jpg"
            alt="Gallery image 3"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem4}`}>
          <img
            src="img/364.jpg"
            alt="Gallery image 4"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem5}`}>
          <img
            src="img/362.jpg"
            alt="Gallery image 5"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem6}`}>
          <img
            src="img/367.jpg"
            alt="Gallery image 6"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem7}`}>
          <img
            src="img/363.jpg"
            alt="Gallery image 7"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem8}`}>
          <img
            src="img/368.jpg"
            alt="Gallery image 8"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem9}`}>
          <img
            src="img/369.jpg"
            alt="Gallery image 9"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem10}`}>
          <img
            src="img/370.jpg"
            alt="Gallery image 10"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem11}`}>
          <img
            src="img/371.jpg"
            alt="Gallery image 11"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem12}`}>
          <img
            src="img/372.jpg"
            alt="Gallery image 12"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem13}`}>
          <img
            src="img/374.jpg"
            alt="Gallery image 13"
            className={styles.galleryImg}
          />
        </figure>
        <figure className={`${styles.galleryItem} ${styles.galleryItem14}`}>
          <img
            src="img/375.jpg"
            alt="Gallery image 14"
            className={styles.galleryImg}
          />
        </figure>
      </section>
    </>
  );
}
export default Dashboard;
