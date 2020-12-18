const db = require("../../config/db.config");
const signalModel = require("./signals.model");
const { getPagination, getPagingData } = require("../Core/pagination");
const Op = db.Sequelize.Op;
const joi = require("joi");

// Create and Save a new signal
exports.create = async (req, res) => {
  try {
    // Validate request
    const { error, value } = schemaSignal.validate(req.body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
      return;
    }
    // Create a signal
    const newSignal = signalModel.build({ signalName: value.signalName });
    // Save signal in the database
    const signal = await newSignal.save();
    res.send(signal);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Retrieve all signals from the database.
exports.findAll = async (req, res) => {
  const { page, size, signalName } = req.query;
  var condition = signalName
    ? { n_senial: { [Op.like]: `%${signalName}%` } }
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
    const id = req.params.id;
    // Validate request
    const { error, value } = schemaSignal.validate(req.body);
    if (error) {
      res.status(400).send({
        message: "Validation error: " + error.message,
      });
      return;
    }
    // Create a signal
    const newSignal = signalModel.build({
      id: req.params.id,
      signalName: value.signalName,
    });

    // Update signal in the database
    const signal = await newSignal.update();
    res.send(signal);
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

const schemaSignal = joi.object({
  signalName: joi.string().alphanum().min(3).max(30).required(),
});
