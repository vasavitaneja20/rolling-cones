const Order = require("../models/Order");

const crypto = require("crypto");

const razorpay = require("../utils/razorpay");

// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      customerPhone,
      razorpayOrderId,
    } = req.body;


    // FIND LAST ORDER
    const lastOrder = await Order.findOne()
      .sort({ orderNumber: -1 });


    const nextOrderNumber =
      lastOrder
        ? lastOrder.orderNumber + 1
        : 1000;


    const newOrder = new Order({
      orderNumber: nextOrderNumber,

      items,

      totalAmount,

      customerPhone,

      razorpayOrderId,

      paymentStatus: "pending",

      orderStatus: "placed",
    });


    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL ORDERS
const getOrders = async (req, res) => {
  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 });

    res.status(200).json(orders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createRazorpayOrder = async (req, res) => {
  try {

    const { amount } = req.body;

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json(order);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const verifyPayment = async (req, res) => {
  try {

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;


    const generatedSignature =
      crypto
        .createHmac(
          "sha256",
          process.env.RAZORPAY_KEY_SECRET
        )
        .update(
          razorpay_order_id + "|" + razorpay_payment_id
        )
        .digest("hex");


    if (generatedSignature !== razorpay_signature) {

      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });

    }


    // UPDATE ORDER
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        paymentStatus: "paid",
        razorpayPaymentId: razorpay_payment_id,
      },
      { new: true }
    );


    res.status(200).json({
      success: true,
      updatedOrder,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createOrder,
  getOrders,
  createRazorpayOrder,
  verifyPayment,
};