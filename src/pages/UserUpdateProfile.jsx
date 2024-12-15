import { useState, useEffect } from "react";
import { uploadProfileImage } from "../services/apiImage";
import { useDispatch, useSelector } from "react-redux";
import { loadUserFromLocalStorage, updateUser } from "../redux/userSlice";
import styles from "./UserUpdateProfile.module.css";
const UserUpdateProfile = () => {
  const dispatch = useDispatch();
  const { user, profilePicture, username, loading, error } = useSelector(
    (state) => state.user
  );

  const [email, setEmail] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(loadUserFromLocalStorage());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setNewUsername("");
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    try {
      const updatedProfile = {
        email,
        password: newPassword || currentPassword || user.password,
        username: newUsername || user.username,
      };

      if (
        updatedProfile.username !== user.username ||
        updatedProfile.password !== user.password
      ) {
        dispatch(updateUser(updatedProfile));
      }

      setUpdateSuccess(true);
      setUpdateError(null);
    } catch (error) {
      setUpdateError("Error updating profile: " + error.message);
      setUpdateSuccess(false);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // ابتدا بررسی کنید که کاربر وارد شده است
        if (!user) {
          setUpdateError("Please log in to upload your profile image.");
          return;
        }

        const imageUrl = await uploadProfileImage(file, user); // ارسال اطلاعات کاربر به تابع آپلود
        console.log("Image URL:", imageUrl); // چاپ URL برای اشکال‌زدایی

        // ذخیره URL تصویر در Redux
        dispatch(updateUser({ profile_picture: imageUrl }));

        setUpdateSuccess(true);
        setUpdateError(null);
      } catch (error) {
        setUpdateError("Error uploading image: " + error.message);
        setUpdateSuccess(false);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className={styles.profileContainer}>
      <h3>Your Users Profile Information</h3>
      {user ? (
        <form
          className={styles.profileForm}
          onSubmit={(e) => e.preventDefault()}
        >
          {/* ایمیل */}
          <div className={styles.emailField}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* current username */}
          <div className={styles.usernameField}>
            <label>Current Username:</label>
            <input type="text" value={user.username} disabled />
          </div>

          {/* فیلد برای تغییر نام کاربری */}
          <div className={styles.usernameField}>
            <label>New Username:</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
            />
          </div>

          {/* current password */}
          <div className={styles.passwordField}>
            <label>Current Password:</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
            />
          </div>

          <div className={styles.passwordField}>
            <label>New Password:</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password (optional)"
            />
          </div>

          <button
            type="button"
            onClick={handleUpdateProfile}
            className={styles.button1}
          >
            Update Profile
          </button>

          {updateError && <p className={styles.errorMessage}>{updateError}</p>}
          {updateSuccess && (
            <p className={styles.successMessage}>
              Profile updated successfully!
            </p>
          )}
        </form>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default UserUpdateProfile;
