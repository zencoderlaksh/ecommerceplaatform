const Order = require("../models/Order");
const { createOrderValidation } = require("../validation/orderValidation");

// Create a new order=================================
exports.createOrder = async (req, res) => {
  const { products, totalAmount } = req.body;
  const { error } = createOrderValidation(req.body);
  try {
    const order = new Order({ userId: req.userId, products, totalAmount });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all orders for a user====================================
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).populate(
      "products.productId"
    );
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single order by ID=============================================
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
