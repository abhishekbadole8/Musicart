const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCart,
} = require("../controllers/cartController");
const authHandler = require("../middleware/authHandler");

router.post("/add/:userId", authHandler, addToCart);
router.get("/:userId", authHandler, getCartItems);
router.patch("/update/:userId/:productId", authHandler, updateCart);
router.delete("/remove/:userId/:productId", authHandler, removeFromCart);

module.exports = router;
