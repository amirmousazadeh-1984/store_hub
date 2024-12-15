import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import reviewReducer from "./reviewSlice";
import orderReducer from "./orderSlice";
import paymentReducer from "./paymentSlice";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    user: userReducer,
    reviews: reviewReducer,
    orders: orderReducer,
    payment: paymentReducer,
  },
});
