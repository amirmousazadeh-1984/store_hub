import { createSlice } from "@reduxjs/toolkit";

const cartItems = localStorage.getItem(
  `cartItems-${localStorage.getItem("userId")}`
);

const initialState = {
  items: cartItems ? JSON.parse(cartItems) : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const existingProductIndex = state.items.findIndex(
        (item) => item.car.id === action.payload.car.id
      );

      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity += action.payload.quantity;
        state.items[existingProductIndex].totalPrice +=
          action.payload.totalPrice;
      } else {
        state.items.push({ ...action.payload, paid: false });
      }

      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(
          `cartItems-${userId}`,
          JSON.stringify(state.items)
        );
      } else {
        console.error("No user ID found in localStorage.");
      }
    },

    markAsPaid: (state, action) => {
      const item = state.items.find(
        (item) => item.car.id === action.payload.id
      );
      if (item) {
        const customPaymentId = `${action.payload.paymentId}-${item.car.id}`;
        item.paid = true;
        item.paymentId = customPaymentId;
      } else {
        console.error("Item not found for marking as paid:", action.payload.id);
      }

      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(
          `cartItems-${userId}`,
          JSON.stringify(state.items)
        );
      }
    },

    updatePaymentStatus: (state, action) => {
      const { paymentId, items } = action.payload;

      state.items = state.items.map((item) => {
        const updatedItem = items.find((i) => i.car.id === item.car.id);
        if (updatedItem) {
          return {
            ...item,
            paid: true,
            paymentId: `${paymentId}-${item.car.id}`,
          };
        }
        return item;
      });

      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(
          `cartItems-${userId}`,
          JSON.stringify(state.items)
        );
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.car.id !== action.payload.id
      );

      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.setItem(
          `cartItems-${userId}`,
          JSON.stringify(state.items)
        );
      }
    },

    clearCart: (state) => {
      state.items = [];

      const userId = localStorage.getItem("userId");
      if (userId) {
        localStorage.removeItem(`cartItems-${userId}`);
      }
    },

    loadCartFromLocalStorage: (state) => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        const storedCart = localStorage.getItem(`cartItems-${userId}`);
        if (storedCart) {
          state.items = JSON.parse(storedCart);
        } else {
          console.warn(
            "No cart data found in localStorage for userId:",
            userId
          );
        }
      } else {
        console.error("No user ID found in localStorage.");
      }
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  loadCartFromLocalStorage,
  updatePaymentStatus,
  markAsPaid,
} = cartSlice.actions;

export default cartSlice.reducer;
