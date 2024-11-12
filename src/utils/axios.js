/* eslint-disable no-undef */
require("dotenv").config();
const axios = require("axios").default;

const baseURL = process.env.API_BASE_URL || "http://localhost:3333";

const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = api;
