const express = require("express");
const {
  updateCart,
  getCart,
  clearCart,
} = require("../controllers/cartController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Get user's cart (protected)
router.get("/", protect, getCart);

// Add or update items in the cart (protected)
router.post("/", protect, updateCart);

// Clear cart (protected)
router.delete("/", protect, clearCart);

module.exports = router;
