const Order = require("../models/Order");


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


module.exports = {
  createOrder,
  getOrders,
};