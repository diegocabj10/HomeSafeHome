const contactModel = require("./contacts.model");
const { getPagination, getPagingData } = require("../../Shared/pagination");
const dbConfig = require("../../../config/db.config");
const Op = dbConfig.Sequelize.Op;

// Create and Save a new contact
exports.create = async (req, res) => {
    try {
        // Create and save a contact
        const newContact = await contactModel.create({
            email: req.body.email,
            phone: req.body.phone,
            name: req.body.name,
            lastName: req.body.lastName,
            userId: req.body.userId,
        });
        res.send(newContact);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Retrieve all contacts from the database.
exports.findAll = async (req, res) => {
    const { page, size, email } = req.query;
    let condition = email ? { email: { [Op.like]: `%${email}%` } } : null;
    condition = { ...condition, userId: req.body.userId };

    try {
        const { limit, offset } = getPagination(page, size);
        const data = await contactModel.findAndCountAll({
            where: condition,
            limit,
            offset,
            order: [['email', 'ASC']],
        });
        const response = getPagingData(data, page, limit);
        res.send(response);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Find a single contact with an id
exports.findOne = async (req, res) => {
    try {
        const data = await contactModel.findByPk(req.params.id);
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Patch a contact by the id in the request
exports.put = async (req, res) => {
    try {
        const contactUpdated = await contactModel.update(
            {
                email: req.body.email,
                phone: req.body.phone,
                name: req.body.name,
                lastName: req.body.lastName,
                userId: req.body.userId,
            },
            {
                where: { id: req.params.id },
            }
        );
        res.send(contactUpdated);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

// Delete a contact with the specified id in the request
exports.delete = async (req, res) => {
    try {
        const data = await contactModel.destroy({
            where: { id: req.params.id },
        });
        res.send(data);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};


exports.findContactsfromOwnerId = async (deviceId) => {
    const userDevice = await usersDevicesModel.findOne({
      raw: true,
      where: { userId: deviceId },
    });
    return userDevice;
  };