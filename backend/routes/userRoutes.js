const express = require("express");
const {
  signup,
  login,
  getUserProfile,
  updateUserRole,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// User signup
router.post("/signup", signup);

// User login
router.post("/login", login);

// Get user profile (protected)
router.get("/profile", protect, getUserProfile);

router.patch("/:id/role", protect, updateUserRole);

module.exports = router;
