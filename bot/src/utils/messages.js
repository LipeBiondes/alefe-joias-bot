const { BOT_NAME, PREFIX } = require("../config");

exports.waitMessage = "Carregando dados...";

exports.menuMessage = () => {
  const date = new Date();

  return ` BEM VINDO A ALEFE JÓIAS!

 • ${BOT_NAME}
 • Data: ${date.toLocaleDateString("pt-br")}
 • Hora: ${date.toLocaleTimeString("pt-br")}
 • Prefixo: ${PREFIX}

╭━━⪩ MENU ⪨━━
▢
▢ • ${PREFIX}ping
▢ • ${PREFIX}sticker
▢ • ${PREFIX}cadastro
▢
╰━━─「🚀」─━━`;
};
