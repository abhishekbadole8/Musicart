const { default: mongoose } = require("mongoose");
const Product = require("../models/productModel");
// const multer = require("multer");
// const upload = multer();

// @desc Create Product
// @route POST api/product/add
// @access public route
const createProduct = async (req, res) => {
  try {
    const {
      title,
      name,
      model,
      model_type,
      quantity_available,
      brand,
      price,
      color,
      rating,
      description,
    } = req.body;

    // Check if all required fields are filled
    const requiredFields = [
      "title",
      "name",
      "model",
      "model_type",
      "quantity_available",
      "brand",
      "price",
      "color",
      "rating",
      "description",
    ];

    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // Convert Uploaded images to Buffers
    // const imageBuffers = req.files.map((file) => file.buffer);

    // create product in database with images
    const product = await Product.create({
      title,
      name,
      model,
      model_type,
      quantity_available,
      brand,
      price,
      color,
      rating,
      description,
      // images: imageBuffers,
    });

    if (product) {
      res.status(201).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get Products
// @route Get api/product/
// @access public route
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get Product
// @route Get api/product/:id
// @access public route
const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findById(productId);

    if (product) {
      res.status(200).json(product);
    } else {
      res.send(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Update Product
// @route Patch api/product/:id
// @access public route
const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updateProduct = await Product.findByIdAndUpdate(productId, req.body, {
      new: true,
    });

    if (updateProduct) {
      res.status(200).json(updateProduct);
    } else {
      res.send(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete Product
// @route Delete api/product/:id
// @access public route
const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await Product.findById(productId);

    if (product) {
      await Product.findByIdAndDelete(productId);
      return res.status(200).json({
        message: ` Product with id: ${productId} is deleted Successfully`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
