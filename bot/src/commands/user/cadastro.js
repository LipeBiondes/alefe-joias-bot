const { InvalidParameterError } = require("../../errors/InvalidParameterError");

const { PREFIX } = require("../../config");

module.exports = {
  name: "cadastro",
  description: "Realizar o cadastro de um usuaio",
  commands: ["cadastro"],
  usage: `${PREFIX}cadastro`,
  handle: async ({ args, createUser }) => {
    const name = args[0];

    if (!name || name.length === 0) {
      throw new InvalidParameterError(
        "Você precisa escrever seu nome após o comando /cadastro!",
      );
    }

    createUser(name);
  },
};
