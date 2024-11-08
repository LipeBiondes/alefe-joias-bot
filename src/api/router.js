const express = require("express");
const { sendMessage } = require("./controllers/messages.controller");
const { validateMessageBody } = require("./middlewares/messages.middlewares");

const createRouter = (socket) => {
  const router = express.Router();

  router.post("/send-message", validateMessageBody, (req, res) => {
    sendMessage(req, res, socket);
  });

  return router;
};

module.exports = createRouter;
