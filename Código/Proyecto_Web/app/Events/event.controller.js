const db = require('../../config/db.config');
const dtoEvento = require('./event.dto');
const eventModel = require('./events.model');

// Create and Save a new Event
exports.create =  async (req, res) =>{
  
  // Validate request
  if (!req.body.eventValue) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
    return;
  }
   // Create a Event
  const Event = new dtoEvento(req.body.eventDate, req.body.eventIdOfSignal, req.body.eventIdOfDevice, req.body.idOfDevice, req.body.device, req.body.eventValue);

  // Save Event in the database
  eventModel.create(Event.toJSON)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while creating the Event.'
      });
    });

}



// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  eventModel.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error retrieving all Events' })
    });
};

// Find a single Event with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  eventModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error retrieving Event with id=' + id
      });
    });
};

// Update a Event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  eventModel.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Event was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error updating Event with id=' + id
      });
    });
};

// Delete a Event with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  eventModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Event was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Could not delete Event with id=' + id
      });
    });
};

// Delete all Events from the database.
exports.deleteAll = (req, res) => {
  eventModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Events were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while removing all Events.'
      });
    });
};

// Find all published Events
exports.findAllPublished = (req, res) => {
  eventModel.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving Events.'
      });
    });
};