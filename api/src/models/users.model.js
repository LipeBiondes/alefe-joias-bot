const database = require("./connection");

const getAllUsers = async () => {
  const [users] = await database.execute("SELECT * FROM users");

  return users;
};

const getUserByPhone = async (phone) => {
  const [user] = await database.execute("SELECT * FROM users WHERE phone = ?", [
    phone,
  ]);

  return user[0];
};

const createUser = async (name, phone) => {
  const [createdUser] = await database.execute(
    "INSERT INTO users (name, phone) VALUES (?, ?)",
    [name, phone],
  );

  return { userId: createdUser.insertId };
};

const updateUser = async (name, phone) => {
  const updatedAt = new Date();

  const [updatedUser] = await database.execute(
    "UPDATE users SET name = ?, updated_at = ? WHERE phone = ?",
    [name, updatedAt, phone],
  );

  return { userId: updatedUser.insertId };
};

const deleteUser = async (phone) => {
  const [deletedUser] = await database.execute(
    "DELETE FROM users WHERE phone = ?",
    [phone],
  );

  return { userId: deletedUser.insertId };
};

module.exports = {
  getUserByPhone,
  createUser,
  updateUser,
  deleteUser,
  getAllUsers,
};
