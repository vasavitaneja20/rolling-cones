const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: ["sweet", "savory"],
      required: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: String,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MenuItem", menuItemSchema);