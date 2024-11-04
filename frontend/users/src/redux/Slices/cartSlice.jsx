import { createSlice } from "@reduxjs/toolkit";

const getCartItems = (userId) => {
  const cart = localStorage.getItem(`cartItems_${userId}`);
  return cart ? JSON.parse(cart) : [];
};

const setCartItems = (userId, items) => {
  localStorage.setItem(`cartItems_${userId}`, JSON.stringify(items));
};

const clearCartItems = (userId) => {
  localStorage.removeItem(`cartItems_${userId}`);
};

const initialState = {
  items: [],
  status: "idle",
  userId: null, // Track the user ID for user-specific cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state, action) => {
      // Set the user ID and load cart items for that user
      const userId = action.payload;
      state.userId = userId;
      state.items = getCartItems(userId);
    },
    addToCart: (state, action) => {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      setCartItems(state.userId, state.items);
    },
    incrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item) item.quantity += 1;
      setCartItems(state.userId, state.items);
    },
    decrementQuantity: (state, action) => {
      const item = state.items.find((i) => i.productId === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      setCartItems(state.userId, state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.productId !== action.payload);
      setCartItems(state.userId, state.items);
    },
    clearCart: (state) => {
      state.items = [];
      clearCartItems(state.userId);
    },
    logoutClearCart: (state) => {
      // Clear the cart on logout
      state.items = [];
      state.userId = null;
    },
  },
});

export const {
  initializeCart,
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  logoutClearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
