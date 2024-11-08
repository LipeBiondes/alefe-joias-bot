const getValueOfGold = require("../utils/get.gold.value");

const getGoldValue = async (req, res) => {
  try {
    const value = await getValueOfGold();

    if (value === null) {
      return res
        .status(500)
        .send({ message: "Erro ao buscar o valor da grama do ouro" });
    }

    res
      .status(200)
      .send({ message: `O valor da grama do ouro hoje é R$ ${value}`, value });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "Erro ao buscar o valor da grama do ouro" });
  }
};

module.exports = { getGoldValue };
