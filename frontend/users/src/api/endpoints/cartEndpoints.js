import apiInstance from "../apiInstance";

// Get Cart Items
export const getCartItems = async () => {
  const response = await apiInstance.get("/cart");
  return response.data;
};

// Add Item to Cart
export const addItemToCart = async (itemData) => {
  const response = await apiInstance.post("/cart", itemData);
  return response.data;
};

// Update Item in Cart
export const updateCartItem = async (itemId, itemData) => {
  const response = await apiInstance.put(`/cart/${itemId}`, itemData);
  return response.data;
};

// Delete Item from Cart
export const deleteCartItem = async (itemId) => {
  const response = await apiInstance.delete(`/cart/${itemId}`);
  return response.data;
};

// Clear Cart
export const clearCart = async () => {
  const response = await apiInstance.delete("/cart");
  return response.data;
};
