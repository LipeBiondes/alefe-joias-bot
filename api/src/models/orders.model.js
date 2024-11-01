const database = require("./connection");

const getAllOrders = async () => {
  const [orders] = await database.execute("SELECT * FROM orders");

  return orders;
};

const getOrderById = async (id) => {
  const [order] = await database.execute("SELECT * FROM orders WHERE id = ?", [
    id,
  ]);

  return order;
};

const getOrdersOfUser = async (id) => {
  const [orders] = await database.execute(
    "SELECT * FROM orders WHERE user_id = ?",
    [id],
  );

  return orders;
};

module.exports = { getAllOrders, getOrdersOfUser, getOrderById };
