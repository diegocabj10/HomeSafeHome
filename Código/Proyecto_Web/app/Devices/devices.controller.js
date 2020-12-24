const dtoDevice = require("./devices.dto");
const deviceModel = require("./devices.model");
const joi = require("joi");
// Create and Save a new device
exports.create = async (req, res) => {
  try {
    // Validate request
    const { error, value } = schemaDevice.validate(req.body);
    if (error) {
      res.status(400).send({
        message: error.message,
      });
      return;
    }
    // Create a device
    const newDevice = deviceModel.build({ deviceName: value.deviceName });
    // Save device in the database
    const device = await newDevice.save();
    res.send(device);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Retrieve all devices from the database.
exports.findAll = (req, res) => {
  deviceModel
    .findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving all Events" });
    });
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
    const id = req.params.id;
    // Validate request
    const { error, value } = schemaSignal.validate(req.body);
    if (error) {
      res.status(400).send({
        message: "Validation error: " + error.message,
      });
      return;
    }
    // Create a device
    const newDevice = deviceModel.build({
      id: id,
      deviceName: value.deviceName,
    });

    // Update device in the database
    const device = await newDevice.update();
    res.send(device);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  deviceModel
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Event was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Event with id=" + id,
      });
    });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  deviceModel
    .destroy({
      where: {},
      truncate: false,
    })
    .then((nums) => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Events.",
      });
    });
};

const schemaDevice = joi.object({
  deviceName: joi.string().alphanum().min(3).max(30).required(),
});
