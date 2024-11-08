const { DangerError } = require("../errors/DangerError");
const { InvalidParameterError } = require("../errors/InvalidParameterError");
const { WarningError } = require("../errors/WarningError");
const { findCommandImport } = require(".");
const { verifyPrefix, hasTypeOrCommand } = require("../middlewares");

const { errorLog } = require("./logger");

exports.dynamicCommand = async (paramsHandler) => {
  const {
    commandName,
    prefix,
    sendWarningReply,
    sendErrorReply,
    verifyUserExist,
    fromMe,
    fullMessage,
    sendText,
    createTicket,
    checkIfTheUserHasATicket,
    closeTicket,
    sendGoldValue,
  } = paramsHandler;

  const { type, command } = findCommandImport(commandName);
  const stop = false; // altere para verdadeiro caso queira parar as mensagens.

  if (!verifyPrefix(prefix) || !hasTypeOrCommand({ type, command })) {
    if (stop === false) {
      if (!fromMe) {
        const hasTicket = await checkIfTheUserHasATicket();
        const timeToClose = 1000 * 60 * 30;

        if (hasTicket) {
          return;
        } else {
          const message = fullMessage.replace(/\D/g, "");

          switch (message) {
            case "1":
              await sendGoldValue();
              break;
            case "2":
              await sendText("Você não possui pedidos pendentes 😉.");
              break;
            case "3":
              await createTicket();

              setTimeout(async () => {
                const hasTicket = await checkIfTheUserHasATicket();

                if (hasTicket) {
                  await sendText(
                    "Já se passaram 30 minutos, o ticket será fechado automaticamente 😅.",
                  );

                  await closeTicket();
                }
              }, timeToClose);
              break;
            default:
              await verifyUserExist();
              break;
          }
        }
      }
    }

    return;
  }

  try {
    await command.handle({
      ...paramsHandler,
      type,
    });
  } catch (error) {
    if (error instanceof InvalidParameterError) {
      await sendWarningReply(`Parâmetros inválidos! ${error.message}`);
    } else if (error instanceof WarningError) {
      await sendWarningReply(error.message);
    } else if (error instanceof DangerError) {
      await sendErrorReply(error.message);
    } else {
      errorLog("Erro ao executar comando", error);
      await sendErrorReply(
        `Ocorreu um erro ao executar o comando ${command.name}! O desenvolvedor foi notificado!
      
📄 *Detalhes*: ${error.message}`,
      );
    }
  }
};
