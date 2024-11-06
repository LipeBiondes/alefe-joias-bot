const validateMessageBody = (req, res, next) => {
  const { number, message } = req.body;

  if (!number || !message) {
    return res
      .status(400)
      .json({ error: "Número e mensagem são obrigatórios" });
  }

  if (typeof number !== "string" || typeof message !== "string") {
    return res
      .status(400)
      .json({ error: "Número e mensagem devem ser strings" });
  }

  next();
};

const validateHello = (req, res, next) => {
  next();
};

module.exports = { validateMessageBody, validateHello };
