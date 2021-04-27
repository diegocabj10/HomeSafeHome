const dbConfig = require("../../../config/db.config");
const claimModel = require("./claims.model");
const { getPagination, getPagingData } = require("../../Shared/pagination");
const Op = dbConfig.Sequelize.Op;

// Create and Save a new claim
exports.create = async (req, res) => {
  try {
    // Create and save a claim
    const newClaim = await claimModel.create({
      date: new Date(),
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
      order: [['date', 'DESC']],
    });
    const response = getPagingData(data, page, limit);
    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Find a single claim with an id
exports.findOne = async (req, res) => {
  try {
    const data = await claimModel.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Patch a claim by the id in the request
exports.patch = async (req, res) => {
  try {
    const claimPatched = await claimModel.update(
      {
        response: req.body.response,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send(claimPatched);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a claim with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const data = await claimModel.destroy({
      where: { id: req.params.id },
    });
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};