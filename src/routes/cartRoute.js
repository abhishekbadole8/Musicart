const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateCart,
} = require("../controllers/cartController");
const authHandler = require("../middleware/authHandler");

router.post("/add/:userId", authHandler, addToCart); // PRIVATE
router.get("/:userId", authHandler, getCartItems); // PRIVATE
router.patch("/update/:userId/:productId", authHandler, updateCart); // PRIVATE
router.delete("/remove/:userId/:productId", authHandler, removeFromCart); // PRIVATE

module.exports = router;
