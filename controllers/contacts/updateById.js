const contacts = require("../../models");

const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.updateById(id, req.body);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateById;
