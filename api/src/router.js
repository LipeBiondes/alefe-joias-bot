const express = require("express");

const {
  getUserByPhone,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
} = require("./controllers/users.controller");

const {
  validateParamsGetUserByPhone,
  validateBodyCreateUser,
  validateUserExists,
  validateBodyUpdateUser,
} = require("./middlewares/users.middlewares");

const {
  getAllOrders,
  getOrdersOfUser,
  getOrderById,
} = require("./controllers/orders.controller");

const {
  validateParamsUserId,
  validateParamsOrderId,
} = require("./middlewares/orders.middlewares");

const router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:phone", validateParamsGetUserByPhone, getUserByPhone);
router.post("/user", validateBodyCreateUser, createUser);
router.put(
  "/user/:phone",
  validateUserExists,
  validateBodyUpdateUser,
  updateUser,
);
router.delete("/user/:phone", validateUserExists, deleteUser);

router.get("/orders", getAllOrders);
router.get("/orders/:userId", validateParamsUserId, getOrdersOfUser);
router.get("/order/:orderId", validateParamsOrderId, getOrderById);

module.exports = router;
