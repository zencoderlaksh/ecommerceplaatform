// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for signup
export const signup = createAsyncThunk(
  "auth/signup",
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/signup",
        formData
      );
      return data; // Success: data contains user and token
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Async thunk for login
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        credentials
      );
      return data; // Success: data contains user and token
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.user = user;
        state.token = token;
        state.isLoading = false;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.user = user;
        state.token = token;
        state.isLoading = false;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
