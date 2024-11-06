const { PREFIX } = require("../../config");

module.exports = {
  name: "encerrar",
  description: "Encerrar o atendimento",
  commands: ["encerrar", "finalizar"],
  usage: `${PREFIX}encerrar`,
  handle: async ({ closeTicket }) => {
    closeTicket();
  },
};
