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

router.post("/add", authHandler, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.patch("/:id", authHandler, updateProduct);
router.delete("/:id", authHandler, deleteProduct);

module.exports = router;
