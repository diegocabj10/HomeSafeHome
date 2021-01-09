const db = require("../../config/db.config");
const dtoUser = require("./users.schemas");
const userModel = require("./users.model");
const { getPagination, getPagingData } = require("../Core/pagination");
const Op = db.Sequelize.Op;

// Create and Save a new user
exports.create = async (req, res) => {
  // https://dev.to/halan/4-ways-of-symmetric-cryptography-and-javascript-how-to-aes-with-javascript-3o1b
  try {
    // Create and save a user
    const newUser = await userModel.create(
      {
      startDate: new Date(),
      email: req.body.email,
      password: req.body.password,
      name: req.body.name,
      surname: req.body.surname,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const { page, size, email } = req.query;
  var condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  try {
    const { limit, offset } = getPagination(page, size);
    const data = await userModel.findAndCountAll({
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

// Find a single User with an id
exports.findOne = (req, res) => {
  try {
    const data = await userModel.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};

// Update a User by the id in the request
exports.update = (req, res) => {
  try {
    const userUpdated = await claimModel.update(
      {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        surname: req.body.surname,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.send(userUpdated);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  try {
    const data = await userModel.destroy({
      where: { id: req.params.id },
    });
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};
