import apiInstance from "../apiInstance";

// Get All Products
export const getProducts = async () => {
  const response = await apiInstance.get("/products");
  return response.data;
};

// Get Product by ID
export const getProductById = async (id) => {
  const response = await apiInstance.get(`/products/${id}`);
  return response.data;
};

// Create a New Product
export const createProduct = async (productData) => {
  const response = await apiInstance.post("/products", productData);
  return response.data;
};

// Organize endpoints into an object
const productEndPoints = {
  products: {
    getProducts,
    getProductById,
    createProduct,
  },
};

// Default export of the endpoints object
export default productEndPoints;
