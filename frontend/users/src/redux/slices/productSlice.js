// redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productEndPoints from "../../api/endpoints/productEndPoints";

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const response = await productEndPoints.products.getAll();
  return response.data;
});

// Async thunk to fetch a product by ID
export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const response = await productEndPoints.products.getById(id);
    return response.data;
  }
);

// Async thunk to create a new product
export const createNewProduct = createAsyncThunk(
  "products/create",
  async (productData) => {
    const response = await productEndPoints.products.create(productData);
    return response.data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: { items: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching all products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetching a product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        // Assuming you want to update the state with the single product
        const existingProduct = state.items.find(
          (product) => product.id === action.payload.id
        );
        if (!existingProduct) {
          state.items.push(action.payload); // Add the product if it doesn't exist
        }
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle creating a new product
      .addCase(createNewProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add the new product to the items
        state.loading = false;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
