const express = require("express");
const {
  createOrder,
  getUserOrders,
  getOrderById,
} = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Create a new order (protected)
router.post("/", protect, createOrder);

// Get all orders for a user (protected)
router.get("/", protect, getUserOrders);

// Get a specific order by ID (protected)
router.get("/:id", protect, getOrderById);

module.exports = router;
