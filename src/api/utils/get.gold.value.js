const axios = require("axios");
const cheerio = require("cheerio");

const getValueOfGold = async () => {
  try {
    // Fazendo a requisição para a página
    const { data } = await axios.get("https://dolarhoje.com/ouro-hoje/");

    // Usando o Cheerio para carregar o HTML da resposta
    const $ = cheerio.load(data);

    // Selecionando o valor do ouro a partir do input com ID "nacional"
    const value = $("#nacional").val();

    return value;
  } catch (error) {
    console.error("Erro ao buscar o valor do ouro:", error);
    return null;
  }
};

module.exports = getValueOfGold;
