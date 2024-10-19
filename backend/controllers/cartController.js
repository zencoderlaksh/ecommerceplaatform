const Cart = require("../models/Cart");
const { updateCartValidation } = require("../validation/userValidation");

// Create or update cart=========================================
exports.updateCart = async (req, res) => {
  const { items } = req.body;
  const { error } = updateCartValidation(req.body);
  try {
    const cart = await Cart.findOneAndUpdate(
      { userId: req.userId },
      { items },
      { new: true, upsert: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user's cart==============================================
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId }).populate(
      "items.productId"
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Clear cart=============================================================
exports.clearCart = async (req, res) => {
  try {
    await Cart.findOneAndDelete({ userId: req.userId });
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
