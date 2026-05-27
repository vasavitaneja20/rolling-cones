const express = require("express");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

const {
  createOrder,
  getOrders,
  createRazorpayOrder,
  verifyPayment,
  updateOrderStatus,
  getSingleOrder,
} = require("../controllers/orderController");


router.post("/", createOrder);

router.get("/", protect, getOrders);

router.get("/:id", getSingleOrder);

router.put(
  "/:id/status",
  protect,
  updateOrderStatus
);

// CREATE RAZORPAY ORDER
router.post("/create-razorpay-order", createRazorpayOrder);

// VERIFY PAYMENT
router.post("/verify-payment", verifyPayment);

module.exports = router;