import UserProfilePicture from "./UserProfilePicture";
import styles from "./UserProfile.module.css";
import UserUpdateProfile from "./UserUpdateProfile";

function UserProfile() {
  return (
    <div className={styles.userprofile}>
      <UserProfilePicture className={styles.part_1} />
      <UserUpdateProfile className={styles.part_2} />
    </div>
  );
}

export default UserProfile;
