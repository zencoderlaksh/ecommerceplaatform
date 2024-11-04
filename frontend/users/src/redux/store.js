import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice";
import userReducer from "./Slices/userSlice";
import productReducer from "./Slices/productSlice";
import cartReducer from "./Slices/cartSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export default store;
