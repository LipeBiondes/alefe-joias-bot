const removeCaracter = (phone) => {
  return phone.replace(/\D/g, "");
};

module.exports = removeCaracter;
