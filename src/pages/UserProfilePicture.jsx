import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../features/athentication/useAuth";
import { uploadProfileImage } from "../services/apiImage";
import styles from "./UserProfilePicture.module.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import { ToastContainer, toast } from "react-toastify"; // اضافه کردن کتابخانه toast
import "react-toastify/dist/ReactToastify.css"; // اضافه کردن استایل‌های Toast

const UserProfilePicture = () => {
  const dispatch = useDispatch();
  const { user, loading } = useAuth();
  const [image, setImage] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);

  const navigate = useNavigate();

  // بارگذاری تصویر از localStorage هر بار که صفحه لود می‌شود
  useEffect(() => {
    if (user) {
      const savedImage = localStorage.getItem(`profile_picture_${user.id}`);
      if (savedImage) {
        setProfilePicture(savedImage);
      } else {
        setProfilePicture("path/to/defaultProfileImage.jpg");
      }
    }
  }, [user]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // آپدیت تصویر انتخاب‌شده
      setUploadError(null); // ریست کردن ارور آپلود

      // نمایش پیش‌نمایش تصویر
      const previewURL = URL.createObjectURL(file);
      setProfilePicture(previewURL); // نمایش تصویر انتخاب‌شده بلافاصله
    }
  };

  const handleUpload = async () => {
    if (!user) {
      const errorMsg = "User not authenticated";
      setUploadError(errorMsg);
      toast.error(errorMsg); // نمایش پیام خطا با toast
      return;
    }

    if (!image) {
      const errorMsg = "Please select an image to upload";
      setUploadError(errorMsg);
      toast.error(errorMsg); // نمایش پیام خطا با toast
      return;
    }

    try {
      const publicURL = await uploadProfileImage(image, user);
      localStorage.setItem(`profile_picture_${user.id}`, publicURL); // ذخیره URL تصویر آپلود شده در localStorage
      setProfilePicture(publicURL); // به روز رسانی profilePicture
      setUploadSuccess(true);
      setUploadError(null);
      toast.success("Profile image uploaded successfully!"); // پیام موفقیت
    } catch (error) {
      const errorMsg = "Upload Error: " + error.message;
      setUploadError(errorMsg);
      setUploadSuccess(false);
      toast.error(errorMsg); // نمایش پیام خطا با toast
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem(`cartItems-${localStorage.getItem("userId")}`);
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      {loading && <p>Loading...</p>}
      {user ? (
        <div>
          <div className={styles.profileImageContainer}>
            {profilePicture ? (
              <div>
                <img
                  alt="Upload Profile Image"
                  className={styles.profileImage}
                  src={profilePicture} // استفاده از تصویر ذخیره شده در profilePicture یا پیش‌نمایش انتخاب شده
                />
              </div>
            ) : (
              <p className={styles.noImageText}>Upload Profile Image</p>
            )}
          </div>

          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            className={styles.uploadInput}
          />
          <div className={styles.total}>
            <div className={styles.labelcontainer}>
              <label htmlFor="file-upload" className={styles.uploadLabel}>
                {image ? `file name : ${image.name}` : "Choose Profile Picture"}
              </label>
            </div>
            <div className={styles.btncontainer}>
              <button onClick={handleUpload} className={styles.uploadButton}>
                Upload Profile Image
              </button>
              {uploadError && (
                <p className={styles.errorMessage}>{uploadError}</p>
              )}

              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable={false}
        pauseOnHover
      />
    </div>
  );
};

export default UserProfilePicture;
