const db = require("../../config/db.config");
const signalModel = require("./signals.model");
const { getPagination, getPagingData } = require("../Core/pagination");
const Op = db.Sequelize.Op;

// Create and save a new signal
exports.create = async (req, res) => {
  try {
    // Create and save signal
    const newSignal = await signalModel.create({
      signalName: req.body.signalName,
    });
    res.send(newSignal);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

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

// Update a signal by the id in the request
exports.update = async (req, res) => {
  try {
    // Update a signal
    const signalUpdated = await signalModel.update(
      {
        signalName: req.body.signalName,
      },
      { where: { id: req.params.id } }
    );

    res.send(signalUpdated);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a signal with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await signalModel.destroy({
      where: { id: id },
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};
