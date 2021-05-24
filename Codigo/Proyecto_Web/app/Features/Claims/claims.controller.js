const claimModel = require("./claims.model");
const { getPagination, getPagingData } = require("../../Shared/pagination");
const dbConfig = require("../../../config/db.config");
const Op = dbConfig.Sequelize.Op;

// Create and Save a new claim
exports.create = async (req, res) => {
  try {

    //Antes de crear el reclamo buscar el usuario del adminsitrador asi seteamos como userId el usuario del administrador
    // Create and save a claim
    const newClaim = await claimModel.create({
      date: new Date(),
      title: req.body.title,
      message: req.body.message,
      administratorUserId: req.body.userId,
    });
    res.send(newClaim);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Retrieve all claims from the database.
exports.findAll = async (req, res) => {
  const { page, size, title } = req.query;
  let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  //TODO buscar que perfil sos y en base a eso obtener el usuario del administrador asi filtramos los reclamos en base al id del usuario administrador
  // condition = { ...condition, userId: req.body.userId };

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

// Update a claim by the id in the request
exports.put = async (req, res) => {
  try {
    const claimUpdated = await claimModel.update({
      title: req.body.title,
      message: req.body.message,
    },
      {
        where: { id: req.params.id },
      }
    );
    res.send(claimUpdated);
  } catch (err) {
    res.status(500).send(err.message);
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