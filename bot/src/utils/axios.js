const axios = require("axios").default;

const api = axios.create({
  baseURL: "http://localhost:3333",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

module.exports = api;
