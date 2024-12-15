import supabase from "./supabase";

export const login = async ({ email, password }) => {
  try {
    const { user, error } = await supabase.auth.signIn({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      throw new Error(error.message);
    }

    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const signup = async ({ email, password, username }) => {
  try {
    const { data, error: checkError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (checkError) {
      console.error("Error checking if user exists:", checkError.message);
      throw new Error("Error checking if user exists: " + checkError.message);
    }

    if (data.length > 0) {
      throw new Error("User with this email already registered.");
    }

    const { data: signUpData, error: signupError } = await supabase.auth.signUp(
      {
        email,
        password,
        options: { data: { username } },
      }
    );

    if (signupError) {
      console.error("Signup error:", signupError);
      throw signupError;
    }

    if (!signUpData?.user) {
      console.error("User object is undefined", signupError);
      throw new Error("User object is undefined");
    }

    const { error: insertError } = await supabase
      .from("users")
      .insert([{ id: signUpData.user.id, email, username }]);

    if (insertError) {
      console.error("Error adding user to database:", insertError.message);
      throw new Error(insertError.message);
    }

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_UP") {
        console.log("User signed up:", session?.user);
      }
    });

    return signUpData.user;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
      throw new Error(error.message);
    }

    localStorage.removeItem("token");
    return true;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

export const addUserToDatabase = async (userId, email) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([{ id: userId, email }]);

    if (error) {
      console.error("Error adding user to users table:", error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error in addUserToDatabase:", error);
    throw error;
  }
};
