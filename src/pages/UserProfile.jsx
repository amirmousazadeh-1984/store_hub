import UserProfilePicture from "./UserProfilePicture";
import UserUpdateProfile from "./userUpdateProfile";
import styles from "./UserProfile.module.css";

function UserProfile() {
  return (
    <div className={styles.userprofile}>
      <UserProfilePicture className={styles.part_1} />
      <UserUpdateProfile className={styles.part_2} />
    </div>
  );
}

export default UserProfile;
