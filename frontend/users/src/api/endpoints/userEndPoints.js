import apiInstance from "../apiInstance";

// User Signup
export const signup = async (userData) => {
  try {
    const response = await apiInstance.post("/users/signup", userData);
    return response.data;
  } catch (error) {
    console.error("Signup API Error:", error);
    throw error;
  }
};

// User Login
export const login = async (credentials) => {
  const response = await apiInstance.post("/users/login", credentials);
  return response.data;
};

// Get User Profile with Bearer Token
export const getUserProfile = async (token) => {
  const response = await apiInstance.get("/users/profile", {
    headers: {
      Authorization: `Bearer ${token}`, // Set the Authorization header with the token
    },
  });
  return response.data; // Return the data from the response
};

// Organize endpoints into an object
const userEndPoints = {
  auth: {
    signup,
    login,
  },
  profile: {
    getUserProfile,
  },
};

export default userEndPoints;
