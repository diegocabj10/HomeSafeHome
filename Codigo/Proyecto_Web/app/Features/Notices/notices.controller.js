const dbConfig = require("../../../config/db.config");
const noticeModel = require('./notices.model');
const { getPagination, getPagingData } = require("../../Shared/pagination");
const Op = dbConfig.Sequelize.Op;

// Create and Save a new notice
exports.create = async (req, res) => {
  try {
    // Create and save a notice
    const newNotice = await noticeModel.create({
      noticeDate: new Date(),
      title: req.body.title,
      message: req.body.message,
      userId: req.body.userId,
    });
    res.send(newClaim);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

// Retrieve all notices from the database.
exports.findAll = async (req, res) => {
  const { page, size, title, message } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  condition = condition + message ? { message: { [Op.like]: `%${message}%` } } : null;
  try {
    const { limit, offset } = getPagination(page, size);
    const data = await noticeModel.findAndCountAll({
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

// Find a single notice with an id
exports.findOne = async (req, res) => {
  try {
    const data = await noticeModel.findByPk(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Update a notice by the id in the request
exports.update = async (req, res) => {
  try {
    const claimUpdated = await noticeModel.update(
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

// Delete a notice with the specified id in the request
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
