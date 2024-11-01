/* eslint-disable no-undef */
const app = require("./app");

const { PORT } = require("./env");

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
