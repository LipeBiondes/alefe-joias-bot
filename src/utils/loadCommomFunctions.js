/* eslint-disable no-undef */
const { BOT_EMOJI } = require("../config");
const { extractDataFromMessage, baileysIs, download } = require(".");
const { waitMessage, menuMessage } = require("./messages");
const fs = require("fs");
const api = require("./axios");
const removeCaracter = require("./removeCaracterToNumber");

exports.loadCommomFunctions = ({ socket, webMessage }) => {
  const {
    args,
    commandName,
    fullArgs,
    fullMessage,
    isReply,
    prefix,
    remoteJid,
    replyJid,
    userJid,
    fromMe,
    pushName,
  } = extractDataFromMessage(webMessage);

  if (!remoteJid || remoteJid.includes("@g.us")) {
    return;
  }

  const isImage = baileysIs(webMessage, "image");
  const isVideo = baileysIs(webMessage, "video");
  const isSticker = baileysIs(webMessage, "sticker");

  const downloadImage = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "image", "png");
  };

  const downloadSticker = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "sticker", "webp");
  };

  const downloadVideo = async (webMessage, fileName) => {
    return await download(webMessage, fileName, "video", "mp4");
  };

  const sendText = async (text, mentions) => {
    let optionalParams = {};

    if (mentions?.length) {
      optionalParams = { mentions };
    }

    return await socket.sendMessage(remoteJid, {
      text: `${BOT_EMOJI} ${text}`,
      ...optionalParams,
    });
  };

  const sendReply = async (text) => {
    return await socket.sendMessage(
      remoteJid,
      { text: `${BOT_EMOJI} ${text}` },
      { quoted: webMessage },
    );
  };

  const sendReact = async (emoji) => {
    return await socket.sendMessage(remoteJid, {
      react: {
        text: emoji,
        key: webMessage.key,
      },
    });
  };

  const sendSuccessReact = async () => {
    return await sendReact("✅");
  };

  const sendWaitReact = async () => {
    return await sendReact("⏳");
  };

  const sendWarningReact = async () => {
    return await sendReact("⚠️");
  };

  const sendErrorReact = async () => {
    return await sendReact("❌");
  };

  const sendSuccessReply = async (text) => {
    await sendSuccessReact();
    return await sendReply(`✅ ${text}`);
  };

  const sendWaitReply = async (text) => {
    await sendWaitReact();
    return await sendReply(`⏳ Aguarde! ${text || waitMessage}`);
  };

  const sendWarningReply = async (text) => {
    await sendWarningReact();
    return await sendReply(`⚠️ Atenção! ${text}`);
  };

  const sendErrorReply = async (text) => {
    await sendErrorReact();
    return await sendReply(`❌ Erro! ${text}`);
  };

  const sendStickerFromFile = async (file) => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: fs.readFileSync(file),
      },
      { quoted: webMessage },
    );
  };

  const sendStickerFromURL = async (url) => {
    return await socket.sendMessage(
      remoteJid,
      {
        sticker: { url },
      },
      { url, quoted: webMessage },
    );
  };

  const sendImageFromFile = async (file, caption = "") => {
    return await socket.sendMessage(
      remoteJid,
      {
        image: fs.readFileSync(file),
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { quoted: webMessage },
    );
  };

  const sendImageFromURL = async (url, caption = "") => {
    return await socket.sendMessage(
      remoteJid,
      {
        image: { url },
        caption: caption ? `${BOT_EMOJI} ${caption}` : "",
      },
      { url, quoted: webMessage },
    );
  };

  const sendAudioFromURL = async (url) => {
    return await socket.sendMessage(
      remoteJid,
      {
        audio: { url },
        mimetype: "audio/mp4",
      },
      { url, quoted: webMessage },
    );
  };

  const sendVideoFromURL = async (url) => {
    return await socket.sendMessage(
      remoteJid,
      {
        video: { url },
      },
      { url, quoted: webMessage },
    );
  };

  const verifyUserExist = async () => {
    const textResponseUserNotExist =
      "Seja bem vindo(a)! eu sou o Alefe, seu assistente virtual da Alefe Jóias, estou aqui para te ajudar" +
      "\n\n" +
      "Aguarde um momento enquanto realizo seu cadastro!";

    const textResponseUserExist =
      "Seja bem vindo(a): " +
      pushName +
      "! eu sou o Alefe, seu assistente virtual da Alefe Jóias, estou aqui para te ajudar.";

    await api
      .get(`/user/${remoteJid}`)
      .then(async () => {
        await sendText(textResponseUserExist);
        await sendText(menuMessage());
      })
      .catch(async (err) => {
        if (err.code === "ECONNREFUSED") {
          await sendErrorReact();
          await sendText(
            "Seja bem vindo(a)! eu sou o Alefe, seu assistente virtual da Alefe Jóias, estou aqui para te ajudar",
          );
          await sendText(
            "Houve um erro ao tentar realizar seu cadastro, tente novamente mais tarde!",
          );
          return;
        }

        await sendText(textResponseUserNotExist);
        await createUser(pushName);
      });
  };

  const createUser = async (name) => {
    const phone = removeCaracter(remoteJid);

    const textResponseUserExist =
      "Seja bem vindo(a): " +
      name +
      "! eu sou o Alefe, seu assistente virtual da Alefe Jóias, estou aqui para te ajudar.";

    const textResponseUserCreatedSuccessfully =
      "Seu cadastro foi realizado com sucesso! ";

    await api
      .post("/user", {
        name,
        phone,
      })
      .then(async (response) => {
        if (response.status === 204) {
          await sendSuccessReact();
          await sendText(textResponseUserCreatedSuccessfully);
          await sendText(menuMessage());
        }
      })
      .catch(async (err) => {
        if (err.code === "ECONNREFUSED") {
          await sendErrorReact();
          await sendText(
            "Houve um erro ao tentar realizar o cadastro tente novamente mais tarde!",
          );
          return;
        }
        if (err.response.status === 409) {
          await sendErrorReact();
          await sendText(textResponseUserExist);
          await sendText(menuMessage());
          return;
        }
        await sendErrorReact();
        await sendText(
          "Houve um erro ao tentar realizar o cadastro tente novamente mais tarde!",
        );
      });
  };

  const createTicket = async () => {
    if (await checkIfOpeningHours()) {
      const userId = await api
        .get(`/user/${remoteJid}`)
        .then((response) => {
          return response.data.user.id;
        })
        .catch(async (err) => {
          if (err.code === "ECONNREFUSED") {
            await sendErrorReact();
            await sendText(
              "Não foi possivel realizer essa operação tente novamente mais tarde!",
            );
            return false;
          }
          return false;
        });

      const title = "Atendimento";
      const description = "Atendimento solicitado pelo cliente";

      const textResponseTicketCreatedSuccessfully =
        "Você foi encaminhado para um atendente, aguarde um pouco que logo ele vai te responder ⏳";

      const textResponseTicketCreatedError =
        "Houve um erro ao tentar realizar o atendimento, tente novamente mais tarde!";

      await api
        .post("/ticket", { title, description, userId })
        .then(async () => {
          await sendSuccessReact();
          await sendText(textResponseTicketCreatedSuccessfully);
        })
        .catch(async (err) => {
          if (err.code === "ECONNREFUSED") {
            await sendErrorReact();
            await sendText(
              "Não foi possivel realizer essa operação tente novamente mais tarde!",
            );
            return;
          }
          await sendErrorReact();
          await sendText(textResponseTicketCreatedError);
        });
    } else {
      await sendErrorReact();
      await sendText(
        "Desculpe, mas estamos fora do horário de atendimento, nosso horário de atendimento é de segunda a sexta das 8h às 12h e das 14h às 18h e aos sábados das 8h às 12h.",
      );
      return;
    }
  };

  const checkIfTheUserHasATicket = async () => {
    const userId = await api
      .get(`/user/${remoteJid}`)
      .then((response) => {
        return response.data.user.id;
      })
      .catch(async (err) => {
        if (err.code === "ECONNREFUSED") {
          return false;
        }
        return false;
      });

    if (userId === false) {
      return false;
    }
    if (userId !== false) {
      const ticket = await api
        .get(`/tickets/${userId}`)
        .then(async (response) => {
          const tickets = response.data.ticket;
          if (tickets.length === 0) {
            return false;
          }
          return true;
        })
        .catch(async (err) => {
          if (err.code === "ECONNREFUSED") {
            return false;
          }
          return false;
        });

      return ticket;
    }
  };

  const closeTicket = async () => {
    const textResponseTicketClosedError =
      "Houve um erro ao tentar encerrar o atendimento, tente novamente mais tarde!";

    const user = await api
      .get(`/user/${remoteJid}`)
      .then((response) => {
        return response.data.user;
      })
      .catch(async (err) => {
        if (err.code === "ECONNREFUSED") {
          await sendErrorReact();
          await sendText(
            "Não foi possivel realizer essa operação tente novamente mais tarde!",
          );
          return false;
        }
        await sendErrorReact();
        await sendText(
          "Não foi possivel realizer essa operação tente novamente mais tarde!",
        );
        return false;
      });

    if (user !== false) {
      const ticket = await api
        .get(`/tickets/${user.id}`)
        .then((response) => {
          return response.data.ticket;
        })
        .catch(async (err) => {
          if (err.code === "ECONNREFUSED") {
            await sendErrorReact();
            await sendText(
              "Não foi possivel realizer essa operação tente novamente mais tarde!",
            );
            return false;
          }

          if (err.response.status === 404) {
            await sendErrorReact();
            await sendText("Esse usuario não possui atendimento em aberto!");
            return false;
          }

          await sendErrorReact();
          await sendText(textResponseTicketClosedError);
          return false;
        });

      if (ticket !== false) {
        ticket.forEach(async (ticket) => {
          await api
            .delete(`/ticket/${ticket.id}`)
            .then(async () => {
              await sendSuccessReact();
              await sendText(
                `Atenção ${user.name}! O ticket: ${ticket.id} foi resolvido e seu atendimento foi encerrado!`,
              );
            })
            .catch(async (err) => {
              if (err.code === "ECONNREFUSED") {
                await sendErrorReact();
                await sendText(
                  "Não foi possivel realizer essa operação tente novamente mais tarde!",
                );
                return;
              }
              await sendErrorReact();
              await sendText(textResponseTicketClosedError);
            });
        });
      }
    }
  };

  const sendGoldValue = async () => {
    await api
      .get("/gold")
      .then(async (response) => {
        const value = response.data.value;
        const labor = 140.0;
        const valueGoldLabor = (parseFloat(value) + labor).toFixed(2);

        const text = `O valor da grama do ouro que vendemos, a vista, é de *R$ ${valueGoldLabor}*\n\nO valor da grama do ouro bruto, na bolsa, 24K é de *R$ ${value}*.`;

        await sendSuccessReact();
        await sendText(text);
      })
      .catch(async (err) => {
        console.log(err);
        if (err.code === "ECONNREFUSED") {
          await sendErrorReact();
          await sendText(
            "Não foi possivel realizer essa operação tente novamente mais tarde!",
          );
          return;
        }
        await sendErrorReact();
        await sendText("Erro ao buscar o valor da grama do ouro");
      });
  };

  const checkIfOpeningHours = async () => {
    const date = new Date();
    const options = { timeZone: "America/Sao_Paulo", hour12: false };
    const day = date.toLocaleString("en-US", { ...options, weekday: "short" });
    const hour = parseInt(
      date
        .toLocaleString("en-US", {
          ...options,
          hour: "2-digit",
          minute: "2-digit",
        })
        .split(":")[0],
    );

    if (day === "Sun") {
      return false;
    }

    if (day === "Sat") {
      return hour >= 8 && hour < 12;
    }

    if ((hour >= 8 && hour < 12) || (hour >= 14 && hour < 18)) {
      return true;
    }

    return false;
  };

  return {
    args,
    commandName,
    fullArgs,
    fullMessage,
    isImage,
    isReply,
    isSticker,
    isVideo,
    prefix,
    remoteJid,
    replyJid,
    socket,
    userJid,
    fromMe,
    webMessage,
    downloadImage,
    downloadSticker,
    downloadVideo,
    sendAudioFromURL,
    sendErrorReact,
    sendErrorReply,
    sendImageFromFile,
    sendImageFromURL,
    sendReact,
    sendReply,
    sendStickerFromFile,
    sendStickerFromURL,
    sendSuccessReact,
    sendSuccessReply,
    sendText,
    sendVideoFromURL,
    sendWaitReact,
    sendWaitReply,
    sendWarningReact,
    sendWarningReply,
    createUser,
    verifyUserExist,
    createTicket,
    checkIfTheUserHasATicket,
    closeTicket,
    sendGoldValue,
    checkIfOpeningHours,
  };
};
