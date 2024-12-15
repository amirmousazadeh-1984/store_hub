import supabase from "./supabase";

export const updateUserProfile = async ({ email, password, username }) => {
  try {
    let updates = {};

    if (email) {
      updates.email = email;
    }
    if (username) {
      updates.user_metadata = { username };
    }
    if (password) {
      const { error: passwordError } = await supabase.auth.updateUser({
        password,
      });
      if (passwordError) {
        throw new Error("Error updating password: " + passwordError.message);
      }
    }

    const { data, error } = await supabase.auth.updateUser(updates);

    if (error) {
      throw new Error("Error updating user profile: " + error.message);
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
