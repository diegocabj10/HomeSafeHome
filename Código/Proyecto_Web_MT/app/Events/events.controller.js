const db = require('../../config/db.config');
const dtoEvento = require('./events.dto');
const eventModel = require('./events.model');
const { getPagination, getPagingData } = require('../Core/pagination');
const Op = db.Sequelize.Op;

// Create and Save a new Event
exports.create = async (req, res) => {

  // Validate request
  if (!req.body.eventValue) {
    res.status(400).send({
      message: 'Debe ingresar un valor'
    });
    return;
  }

  // Create a Event
  const Event = new dtoEvento(new Date(), req.body.eventIdOfSignal, req.body.eventIdOfDevice, req.body.eventValue);
  console.log(Event.toJSON);
  // Save Event in the database
  eventModel.create(Event.toJSON)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error dando de alta al evento: ' + err.message
      });
    });

}

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  eventModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error buscando los eventos: ' + err.message })
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
        message: 'Error buscando el evento con id=' + id
      });
    });
};

// Update a Event by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const Evento = new dtoEvento();
  if (req.body.eventIdOfDevice) { Evento.eventIdOfDevice = req.body.eventIdOfDevice; }
  if (req.body.eventIdOfSignal) { Evento.eventIdOfSignal = req.body.eventIdOfSignal; }
  if (req.body.eventValue) { Evento.eventValue = req.body.eventValue; }
  if (req.body.eventDelete) { Evento.eventDeletionDate = new Date(); }

  eventModel.update(Evento.toJSON, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Evento actualizado'
        });
      } else {
        res.send({
          message: `Con estos datos no se puede actualizar el evento con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error actualizando el evento con id=' + id + ' ' + err.message
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
          message: 'Evento borrado con éxito'
        });
      } else {
        res.send({
          message: `No se puede borrar el evento con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'No se puede borrar el evento con id=' + id + '. Error: ' + err.message
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
      res.send({ message: `${nums} eventos borrados con éxito` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error al borrar todos los eventos: ' + err.message
      });
    });
};
