const contacts = require("../../models");

const getAll = async (req, res) => {
  const result = await contacts.getAll();
  res.json(result);
};

module.exports = getAll;
