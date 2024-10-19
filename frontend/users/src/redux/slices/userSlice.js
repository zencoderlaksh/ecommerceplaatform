import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userEndPoints from "../../api/endpoints/userEndPoints";

// Async thunk for fetching user profile
export const getUserProfile = createAsyncThunk(
  "user/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    const state = getState(); // Get the current state
    const token = state.auth.token; // Access the token from the auth slice

    try {
      const response = await userEndPoints.profile.getUserProfile(token); // Pass the token to the API function
      return response.data; // Ensure the API returns the expected data structure
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: { userInfo: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Clear previous errors on new request
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userInfo = action.payload; // Assuming payload contains user info
        state.loading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Set the error from rejectWithValue
      });
  },
});

export default userSlice.reducer;
