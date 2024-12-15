// src/redux/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "../services/supabase";

// ایجاد اکشن برای ارسال نظر به سرور
export const addReview = createAsyncThunk(
  "reviews/addReview",
  async ({ productId, text, userId, rating }) => {
    if (!userId || !productId || !text || rating === undefined) {
      throw new Error("Missing required fields");
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([{ product_id: productId, text, user_id: userId, rating }]); // ذخیره user_id

    if (error) {
      console.error("Error adding review:", error);
      throw new Error(error.message);
    }

    return data; // برگرداندن داده‌های ارسال شده
  }
);

// تعریف Slice
const reviewSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setReviews: (state, action) => {
      state.reviews = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.reviews.push(action.payload[0]); // افزودن نظر جدید
      })
      .addCase(addReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
