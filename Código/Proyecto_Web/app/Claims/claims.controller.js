const db = require("../../config/db.config");
const claimModel = require("./claims.model");
const { getPagination, getPagingData } = require("../Core/pagination");
const Op = db.Sequelize.Op;

// Create and Save a new claim
exports.create = async (req, res) => {
  try {
    // Create and save a claim
    const newClaim = await claimModel.create({
      claimDate: new Date(),
      title: req.body.title,
      message: req.body.message,
      userId: req.body.userId,
    });
    res.send(newClaim);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Retrieve all claims from the database.
exports.findAll = async (req, res) => {
  const { page, size, title, message } = req.query;
  var condition = title ? { titulo: { [Op.like]: `%${title}%` } } : null;

  try {
    const { limit, offset } = getPagination(page, size);
    const data = await claimModel.findAndCountAll({
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

// Find a single claim with an id
exports.findOne = async (req, res) => {
  try {
    const data = await claimModel.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

// Update a claim by the id in the request
exports.update = async (req, res) => {
  try {
    const claimUpdated = await claimModel.update(
      {
        title: req.body.title,
        message: req.body.message,
        userId: req.body.userId,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send(claimUpdated);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a claim with the specified id in the request
exports.delete = (req, res) => {
  try {
    const data = await claimModel.destroy({
      where: { id: req.params.id },
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};