const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      Required: true,
    },
    name: {
      type: String,
      Required: true,
    },
    model: {
      type: String,
      Required: true,
    },
    model_type: {
      type: String,
      Required: true,
    },
    quantity_available: {
      type: Number,
      Required: true,
    },
    brand: {
      type: String,
      Required: true,
    },
    price: {
      type: Number,
      Required: true,
    },
    color: {
      type: String,
      Required: true,
    },
    rating: {
      type: Number,
      Required: true,
    },
    description: {
      type: String,
      Required: true,
    },
    inCart: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
