const notificationModel = require("./notifications.model");
const { getPagination, getPagingData } = require("../Core/pagination");

// Create and Save a new Notification
exports.create = async (eventId, title, message, userId) => {
  try {
    // Create and save a notification
    const newNotification = await notificationModel.create({
      notificationDate: new Date(),
      readDate: null,
      userId: userId,
      eventId: eventId,
      title: title,
      message: message,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Retrieve all Notifications from the database.
exports.findAll = async (req, res) => {
    const { page, size, title, message } = req.query;
    var condition = title ? { titulo: { [Op.like]: `%${title}%` } } : null;
  
    try {
      const { limit, offset } = getPagination(page, size);
      const data = await notificationModel.findAndCountAll({
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

// Find a single Notification with an id
exports.findOne = async (req, res) => {
  try {
    const data = await claimModel.findByPk(req.params.id);
    res.send(data);
  } catch (error) {
    res.status(500).send({ message: err.message });
  }
};
