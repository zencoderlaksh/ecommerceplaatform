const Product = require("../models/Product");
const {
  createProductValidation,
  updateProductValidation,
} = require("../validation/productValidation");
const { handleError } = require("../utils/errorHandler");

// Create a new product=================================================
// Ensure that only admin can create a product
exports.createProduct = async (req, res) => {
  const { name, price, description, imageUrl, category, stock } = req.body;

  // Validate the input data for product creation
  const { error } = createProductValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if the user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  try {
    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      category,
      stock,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    handleError(res, error);
  }
};

// Get all products with optional category filter
exports.getProducts = async (req, res) => {
  const { category } = req.query; // retrieve the category from query parameters

  try {
    // If category is provided, filter products by category; otherwise, return all products
    const products = category
      ? await Product.find({ category })
      : await Product.find();

    res.status(200).json(products);
  } catch (error) {
    handleError(res, error);
  }
};

// Get a single product by ID====================================================
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error);
  }
};

// Update a product====================================================================
// Ensure that only admin can update a product
exports.updateProduct = async (req, res) => {
  // Validate the input data for product update
  const { error } = updateProductValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // Check if the user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    handleError(res, error);
  }
};

// Delete a product==============================================================
// Ensure that only admin can delete a product
exports.deleteProduct = async (req, res) => {
  // Check if the user is an admin
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access denied, admin only" });
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    handleError(res, error);
  }
};
