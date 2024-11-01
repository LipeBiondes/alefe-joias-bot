/* eslint-disable no-undef */
require("dotenv").config({ path: "../.env" });

module.exports = {
  client: "mysql2",
  connection: {
    database: process.env.MYSQL_DB,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
