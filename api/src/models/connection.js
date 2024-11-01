/* eslint-disable no-undef */
const mysql = require("mysql2/promise");
const env = require("../env");

const database = mysql.createPool({
  connectionLimit: 10,
  host: env.MYSQL_HOST,
  user: env.MYSQL_USER,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DB,
});

module.exports = database;
