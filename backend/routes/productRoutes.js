const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router();

// Get all products
router.get("/", getProducts);

// Get a specific product by ID
router.get("/:id", getProductById);

// Create a new product (admin only)
router.post("/", protect, isAdmin, createProduct);

// Update a product (admin only)
router.put("/:id", protect, isAdmin, updateProduct);

// Delete a product (admin only)
router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;
