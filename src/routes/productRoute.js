const express = require("express");
const router = express.Router();
const authHandler = require("../middleware/authHandler");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router.post("/add", authHandler, createProduct); // PRIVATE
router.get("/", getProducts); // PUBLIC
router.get("/:productId", getProduct); // PUBLIC
router.patch("/:productId", authHandler, updateProduct); // PRIVATE
router.delete("/:productId", authHandler, deleteProduct); // PRIVATE

module.exports = router;
