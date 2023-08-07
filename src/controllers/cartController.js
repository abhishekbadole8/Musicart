const { default: mongoose } = require("mongoose");
const CartItem = require("../models/cartModel");
const User = require("../models/userModel");

// Add to cart/ if already present then update
const addToCart = async (req, res) => {
  try {
    const { userId } = req.params;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(404)
        .json({ message: "User not found with the provided ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(404)
        .json({ message: "Product not found with the provided ID" });
    }

    // Find the User
    const user = await User.findById(userId);

    if (!user) {
      res.status().json({ message: "User not found with the provided ID" });
    }

    // Check if the cart item already exist for this user
    const existingCartItem = await CartItem.findOne({ userId });

    if (existingCartItem) {
      // update qty if cart item already exist
      existingCartItem.quantity += quantity;
      await existingCartItem.save();
    } else {
      //create new
      return await CartItem.create({ userId, productId, quantity });
    }
    res.status(201).json({ message: "Product added to cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get cart items
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(404)
        .json({ message: "User not found with the provided ID" });
    }

    const cartItems = await CartItem.find({ userId });

    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update cart
const updateCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const { quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(404)
        .json({ message: "User not found with the provided ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(404)
        .json({ message: "Product not found with the provided ID" });
    }

    //find cart item
    const cartItem = await CartItem.findOneAndUpdate(
      { userId, productId },
      { quantity },
      { new: true }
    );

    if (!cartItem) res.status(404).json({ message: "Cart Item Not Present" });

    res.status(200).json({ message: "Cart Item Quantity Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(404)
        .json({ message: "User not found with the provided ID" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(404)
        .json({ message: "Product not found with the provided ID" });
    }

    // Find and delete cart item based on userId and productId
    const deleteCartItem = await CartItem.findOneAndDelete({
      userId,
      productId,
    });

    if (!deleteCartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    return res.status(200).json({ message: "Product removed from cart" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addToCart, getCartItems, updateCart, removeFromCart };
