const sendMessage = async (req, res, socket) => {
  const { number, message } = req.body;

  try {
    await socket.sendMessage(number, {
      text: message,
    });

    res.status(201).send("Mensagem enviada com sucesso!");
  } catch (error) {
    res.status(500).send("Erro ao enviar a mensagem.");
  }
};

module.exports = { sendMessage };
