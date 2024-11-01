const { PREFIX } = require("../../config");
const { menuMessage } = require("../../utils/messages");

let text = menuMessage();

module.exports = {
  name: "menu",
  description: "Menu de comandos",
  commands: ["menu", "help"],
  usage: `${PREFIX}menu`,
  handle: async ({ sendText }) => {
    await sendText(text);
  },
};
