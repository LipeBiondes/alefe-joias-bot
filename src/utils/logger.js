const { version } = require("../../package.json");

exports.sayLog = (message) => {
  console.log("\x1b[36m[ALEFE-JOIAS BOT | TALK]\x1b[0m", message);
};

exports.inputLog = (message) => {
  console.log("\x1b[30m[ALEFE-JOIAS BOT | INPUT]\x1b[0m", message);
};

exports.infoLog = (message) => {
  console.log("\x1b[34m[ALEFE-JOIAS BOT | INFO]\x1b[0m", message);
};

exports.successLog = (message) => {
  console.log("\x1b[32m[ALEFE-JOIAS BOT | SUCCESS]\x1b[0m", message);
};

exports.errorLog = (message) => {
  console.log("\x1b[31m[ALEFE-JOIAS BOT | ERROR]\x1b[0m", message);
};

exports.warningLog = (message) => {
  console.log("\x1b[33m[ALEFE-JOIAS BOT | WARNING]\x1b[0m", message);
};

exports.bannerLog = () => {
  console.log("\x1b[36mAlefe-Joias Bot\x1b[0m");
  console.log(`\x1b[36m🤖 Versão: \x1b[0m${version}\n`);
};
