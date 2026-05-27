const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  createRazorpayOrder,
  verifyPayment,
} = require("../controllers/orderController");


// CREATE ORDER
router.post("/", createOrder);


// GET ALL ORDERS
router.get("/", getOrders);

// CREATE RAZORPAY ORDER
router.post("/create-razorpay-order", createRazorpayOrder);

// VERIFY PAYMENT
router.post("/verify-payment", verifyPayment);

module.exports = router;