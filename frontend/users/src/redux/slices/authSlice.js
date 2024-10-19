// Import the getUserProfile function
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userEndPoints from "../../api/endpoints/userEndPoints";

// Async thunk for user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await userEndPoints.auth.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userEndPoints.auth.signup(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

// Async thunk for fetching user profile
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await userEndPoints.profile.getUserProfile(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch user profile"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    // Handle login actions
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors on new request
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Login Payload:", action.payload); // Debug log
        if (action.payload) {
          state.user = action.payload.user || null; // Ensure user exists
          state.token = action.payload.token || null; // Ensure token exists
        }
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from rejectWithValue
      })
      // Handle signup actions
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors on new request
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        console.log("Signup Payload:", action.payload);
        if (action.payload) {
          state.user = action.payload.user || null; // Ensure user exists
          state.token = action.payload.token || null; // Ensure token exists
        }
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from rejectWithValue
      })
      // Handle fetch user profile action
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload; // Set user data
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from rejectWithValue
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
