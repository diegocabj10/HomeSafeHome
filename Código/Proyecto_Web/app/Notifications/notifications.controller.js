const dtoNotificationo = require('./notifications.dto');
const notificationModel = require('./notifications.model');
const { getPagination, getPagingData } = require('../Core/pagination');


// Create and Save a new Notification
exports.create = async (eventId, tittle, message, userId) => {
  // Create a Notification
  const Notification = new dtoNotificationo(new Date(), null, userId, eventId, tittle, message);
  // Save Notification in the database
  notificationModel.create(Notification.toJSON)
    .then(data => {
      console.log(data);
    })
    .catch(err => {

    });

}



// Retrieve all Notifications from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);
  notificationModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error retrieving all Notifications' })
    });

};

// Find a single Notification with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  notificationModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Notification with id=' + id
      });
    });
};

// Update a Notification by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  notificationModel.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Notification was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Notification with id=${id}. Maybe Notification was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Notification with id=' + id
      });
    });
};

// Delete a Notification with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  notificationModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Notification was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Notification with id=${id}. Maybe Notification was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Notification with id=' + id
      });
    });
};

// Delete all Notifications from the database.
exports.deleteAll = (req, res) => {
  notificationModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Notifications were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Notifications.'
      });
    });
};
