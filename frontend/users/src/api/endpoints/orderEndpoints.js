import apiInstance from "../apiInstance";

// Create Order
export const createOrder = async (orderData) => {
  const response = await apiInstance.post("/orders", orderData);
  return response.data;
};

// Get User Orders
export const getUserOrders = async () => {
  const response = await apiInstance.get("/orders");
  return response.data;
};

// Get Order by ID
export const getOrderById = async (orderId) => {
  const response = await apiInstance.get(`/orders/${orderId}`);
  return response.data;
};

// Update Order (if needed)
export const updateOrder = async (orderId, orderData) => {
  const response = await apiInstance.put(`/orders/${orderId}`, orderData);
  return response.data;
};

// Delete Order (if needed)
export const deleteOrder = async (orderId) => {
  const response = await apiInstance.delete(`/orders/${orderId}`);
  return response.data;
};

// Organize endpoints into an object
const orderEndPoints = {
  orders: {
    createOrder,
    getUserOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
  },
};

// Default export of the endpoints object
export default orderEndPoints;
