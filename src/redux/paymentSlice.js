// paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentData: null,
  paymentStatus: "idle", // "idle", "processing", "succeeded", "failed"
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    startPayment: (state) => {
      state.paymentStatus = "processing";
    },
    paymentSuccess: (state, action) => {
      state.paymentData = action.payload;
      state.paymentStatus = "succeeded";
    },
    paymentFailure: (state) => {
      state.paymentData = null; // پاک کردن اطلاعات پرداخت در صورت خطا
      state.paymentStatus = "failed";
      console.log("Payment failed, resetting payment state.");
    },

    resetPayment: (state) => {
      state.paymentData = null;
      state.paymentStatus = "idle";
    },
  },
});

export const { startPayment, paymentSuccess, paymentFailure, resetPayment } =
  paymentSlice.actions;
export default paymentSlice.reducer;
