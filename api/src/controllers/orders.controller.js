const orderModel = require("../models/orders.model");

const getAllOrders = async (req, res) => {
  const orders = await orderModel.getAllOrders();

  if (!orders.length) {
    return res.status(404).json({ message: "Orders not found" });
  }

  return res.status(200).json({ orders });
};

const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  const order = await orderModel.getOrderById(orderId);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  return res.status(200).json({ order });
};

const getOrdersOfUser = async (req, res) => {
  const { userId } = req.params;

  const orders = await orderModel.getOrdersOfUser(userId);

  if (!orders.length) {
    return res.status(404).json({ message: "Orders not found" });
  }

  return res.status(200).json({ orders });
};

module.exports = { getAllOrders, getOrdersOfUser, getOrderById };
