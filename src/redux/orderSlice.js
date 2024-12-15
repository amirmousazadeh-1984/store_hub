import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrderApi } from "../services/apiOrders"; // فرض بر این است که این تابع برای ثبت سفارش است

// ثبت سفارش
export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async ({ productId, username }, { rejectWithValue }) => {
    try {
      const response = await addOrderApi({ productId, username }); // ارسال اطلاعات به API
      return response.data; // برگرداندن اطلاعات ثبت شده
    } catch (error) {
      return rejectWithValue(error.message); // برگرداندن خطا در صورت وقوع
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // ذخیره سفارشات
    loading: false, // وضعیت در حال بارگذاری
    error: null, // ذخیره خطا در صورت وقوع
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // وقتی درخواست موفقیت‌آمیز بود
      .addCase(addOrder.pending, (state) => {
        state.loading = true; // نمایش وضعیت در حال بارگذاری
        state.error = null; // حذف خطای قبلی
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.loading = false; // تمام شدن بارگذاری
        state.orders.push(action.payload); // اضافه کردن سفارش به آرایه سفارشات
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.loading = false; // تمام شدن بارگذاری
        state.error = action.payload; // ذخیره پیام خطا
      });
  },
});

export default orderSlice.reducer;
