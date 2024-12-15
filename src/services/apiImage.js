import supabase from "./supabase";

export const uploadProfileImage = async (file, user) => {
  if (!user) {
    throw new Error("User not authenticated");
  }

  const filePath = `${user.id}-${Date.now()}-${file.name}`;

  try {
    const { data, error: uploadError } = await supabase.storage
      .from("profile_pictures")
      .upload(filePath, file);

    if (uploadError) {
      throw new Error("Error during file upload: " + uploadError.message);
    }

    let publicURL;

    if (data.fullPath) {
      publicURL = `https://lgslhvojlkmozqxwxwog.supabase.co/storage/v1/object/public/${data.fullPath}`;
    } else if (data.path) {
      publicURL = `https://lgslhvojlkmozqxwxwog.supabase.co/storage/v1/object/public/${data.path}`;
    }

    console.log("Public URL:", publicURL); // چاپ URL عمومی

    if (!publicURL) {
      throw new Error("Error getting public URL.");
    }

    // بروزرسانی تصویر پروفایل در دیتابیس
    const { error: updateError } = await supabase
      .from("users")
      .update({ profile_picture: publicURL }) // بروزرسانی ستون profile_picture
      .eq("id", user.id); // فیلتر بر اساس شناسه کاربر

    if (updateError) {
      throw new Error(
        "Error updating profile picture in database: " + updateError.message
      );
    }

    return publicURL; // بازگرداندن آدرس عمومی
  } catch (error) {
    throw new Error("Error uploading profile image: " + error.message);
  }
};
