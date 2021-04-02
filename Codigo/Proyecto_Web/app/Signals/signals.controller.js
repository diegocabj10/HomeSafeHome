const db = require("../../config/db.config");
const signalModel = require("./signals.model");
const { getPagination, getPagingData } = require("../Core/pagination");
const Op = db.Sequelize.Op;


// Retrieve all signals from the database.
exports.findAll = async (req, res) => {
  const { page, size, signalName } = req.query;
  var condition = signalName
    ? { signalName: { [Op.like]: `%${signalName}%` } }
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
  } catch (error) {
    res.status(500).send(err.message);
  }
};

// Find a single signal with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await signalModel.findByPk(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};
