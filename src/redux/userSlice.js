import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase";
import { uploadProfileImage } from "../services/apiImage";

export const loadUserFromLocalStorage = createAsyncThunk(
  "user/loadUserFromLocalStorage",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw new Error(error.message);

        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("username, profile_picture")
          .eq("id", data.user.id)
          .single();

        if (userError) throw new Error(userError.message);

        return {
          ...data.user,
          username: userData.username,
          profile_picture: userData.profile_picture,
        };
      } catch (error) {
        console.error("Error loading user from Supabase:", error);
        return rejectWithValue(error.message);
      }
    }
    return null;
  }
);

export const uploadProfilePicture = createAsyncThunk(
  "user/uploadProfilePicture",
  async (image, { rejectWithValue, getState }) => {
    try {
      const user = getState().user.user;
      if (!user) throw new Error("User not authenticated");

      const publicURL = await uploadProfileImage(image, user);
      return publicURL;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw new Error(error.message);

      const { session } = data;
      if (session) {
        localStorage.setItem("token", session.access_token);
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkUserSession = createAsyncThunk(
  "user/checkUserSession",
  async (_, { rejectWithValue }) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) throw new Error(error.message);
      return user; // برگرداندن وضعیت کاربر
    } catch (error) {
      return rejectWithValue(error.message); // مدیریت خطا
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (updatedData, { rejectWithValue, getState }) => {
    try {
      const user = getState().user.user;
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase
        .from("users")
        .update(updatedData)
        .eq("id", user.id);

      if (error) throw new Error(error.message);

      return updatedData; // بازگشت داده‌های به‌روزرسانی شده
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    previousUser: null,
    loading: false,
    error: null,
    profilePicture: null,
  },

  reducers: {
    setProfilePicture: (state, action) => {
      if (state.user) {
        state.user.profile_picture = action.payload;
        state.profilePicture = action.payload;
      }
    },
    loginUser: (state, action) => {
      if (state.user && state.user.id !== action.payload.id) {
        state.previousUser = state.user;
      }
      state.user = action.payload;
      state.loading = false;
    },
    clearPreviousUser: (state) => {
      state.previousUser = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadUserFromLocalStorage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUserFromLocalStorage.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(loadUserFromLocalStorage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(uploadProfilePicture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Uploaded image URL:", action.payload);
        state.profilePicture = action.payload;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(checkUserSession.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkUserSession.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkUserSession.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
