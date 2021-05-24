const signalModel = require("./signals.model");
const { getPagination, getPagingData } = require("../../Shared/pagination");
const dbConfig = require("../../../config/db.config");

const Op = dbConfig.Sequelize.Op;


// Retrieve all signals from the database.
exports.findAll = async (req, res) => {
  const { page, size, name } = req.query;
  var condition = name
    ? { name: { [Op.like]: `%${name}%` } }
    : null;
  try {
    const { limit, offset } = getPagination(page, size);
    const data = await signalModel.findAndCountAll({
      where: condition,
      limit,
      offset,
    });
    const response = getPagingData(data, page, limit);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Find a single signal with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await signalModel.findByPk(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
