const db = require("../../config/db.config");
const deviceModel = require("./devices.model");
const { getPagination, getPagingData } = require("../Core/pagination");
const Op = db.Sequelize.Op;

// Create and Save a new device
exports.create = async (req, res) => {
  try {
    // Create and save device
    const newDevice = await deviceModel.create({
      deviceName: req.body.deviceName,
    });
    res.send(device);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Retrieve all devices from the database.
exports.findAll = async (req, res) => {
  const { page, size, deviceName } = req.query;
  var condition = deviceName
    ? { deviceName: { [Op.like]: `%${deviceName}%` } }
    : null;
  try {
    const { limit, offset } = getPagination(page, size);
    const data = await deviceModel.findAndCountAll({
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

// Find a single device with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await deviceModel.findByPk(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

// Update a device by the id in the request
exports.update = async (req, res) => {
  try {
    // Update device in the database
    const deviceUpdated = await newDevice.update(
      {
        deviceName: req.body.deviceName,
      },
      { where: { id: req.params.id } }
    );
    res.send(deviceUpdated);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// Delete a device with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  try {
    const data = await deviceModel.destroy({
      where: { id: id },
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }

};