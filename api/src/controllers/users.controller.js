const usersModel = require("../models/users.model");
const removeCaracter = require("../utils/removeCaracterToNumber");

const getAllUsers = async (req, res) => {
  const users = await usersModel.getAllUsers();

  if (!users.length) {
    return res.status(404).json({ message: "Users not found" });
  }

  const usersFormated = users.map((user) => {
    return {
      id: user.id,
      name: user.name,
      phone: user.phone.replace(/(\d{2})(\d{6})(\d{4})/, "+$1 $2-$3"),
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  });

  return res.status(200).json({ users: usersFormated });
};

const getUserByPhone = async (req, res) => {
  const { phone } = req.params;

  const phoneFormated = removeCaracter(phone);

  const user = await usersModel.getUserByPhone(phoneFormated);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({ user });
};

const createUser = async (req, res) => {
  const { name, phone } = req.body;

  const user = await usersModel.createUser(name, phone);

  if (!user) {
    return res.status(400).json({ message: "error creating user" });
  }

  return res.status(204).json({ userId: user.userId });
};

const updateUser = async (req, res) => {
  const { phone } = req.params;
  const { name } = req.body;

  const user = await usersModel.updateUser(name, phone);

  return res.status(204).json({ userId: user.userId });
};

const deleteUser = async (req, res) => {
  const { phone } = req.params;

  const user = await usersModel.deleteUser(phone);

  return res.status(204).json({ userId: user.userId });
};

module.exports = {
  getUserByPhone,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
