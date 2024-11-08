const express = require("express");
const { sendMessage, sendHello } = require("./controllers/messages.controller");
const {
  validateMessageBody,
  validateHello,
} = require("./middlewares/messages.middlewares");

const createRouter = (socket) => {
  const router = express.Router();

  router.get("/", validateHello, sendHello);

  router.post("/send-message", validateMessageBody, (req, res) => {
    sendMessage(req, res, socket);
  });

  return router;
};

module.exports = createRouter;
