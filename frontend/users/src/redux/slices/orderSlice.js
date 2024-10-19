// redux/slices/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderEndPoints from "../../api/endpoints/orderEndPoints";

// Async thunk to create a new order
export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData) => {
    const response = await orderEndPoints.orders.create(orderData);
    return response.data;
  }
);

// Async thunk to get user orders
export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUser",
  async () => {
    const response = await orderEndPoints.orders.getUserOrders();
    return response.data;
  }
);

// Async thunk to get an order by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (orderId) => {
    const response = await orderEndPoints.orders.getOrderById(orderId);
    return response.data;
  }
);

// Async thunk to update an order
export const updateOrder = createAsyncThunk(
  "orders/update",
  async ({ orderId, orderData }) => {
    const response = await orderEndPoints.orders.updateOrder(
      orderId,
      orderData
    );
    return response.data;
  }
);

// Async thunk to delete an order
export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (orderId) => {
    const response = await orderEndPoints.orders.deleteOrder(orderId);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Handle creating an order
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.push(action.payload);
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetching user orders
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetching an order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        // Assuming you want to add the order if it doesn't exist
        const existingOrder = state.orders.find(
          (order) => order.id === action.payload.id
        );
        if (!existingOrder) {
          state.orders.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle updating an order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload; // Update the existing order
        }
        state.loading = false;
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle deleting an order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        ); // Remove the deleted order
        state.loading = false;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
