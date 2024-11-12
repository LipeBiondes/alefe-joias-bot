const removeCaracter = require("../../utils/removeCaracterToNumber");

const sendMessage = async (req, res, socket) => {
  const { number, message } = req.body;

  const numberFormated = `${removeCaracter(number)}@s.whatsapp.net`;

  try {
    await socket.sendMessage(numberFormated, {
      text: message,
    });

    res.status(201).send("Mensagem enviada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao enviar a mensagem.");
  }
};

module.exports = { sendMessage };
