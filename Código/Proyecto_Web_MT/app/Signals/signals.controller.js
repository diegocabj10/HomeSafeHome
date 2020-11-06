const db = require('../../config/db.config');
const dtoSignal = require('./signals.dto');
const signalModel = require('./signals.model');
const { getPagination, getPagingData } = require('../Core/pagination');
const Op = db.Sequelize.Op;

// Create and Save a new signal
exports.create = async (req, res) => {

  // Validate request
  if (!req.body.signalName) {
    res.status(400).send({
      message: 'Debe ingresar nombre'
    });
    return;
  }

  // Create a signal
  const Signal = new dtoSignal(req.body.signalName);
  // Save signal in the database
  signalModel.create(Signal.toJSON)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error dando de alta la señal: ' + err.message
      });
    });

}

// Retrieve all signals from the database.
exports.findAll = (req, res) => {
  const { page, size, signalName } = req.query;
  var condition = signalName ? { n_senial: { [Op.like]: `%${signalName}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  signalModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error buscando las señales: ' + err.message })
    });

};

// Find a single signal with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  signalModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error buscando la señal con id=' + id
      });
    });
};

// Update a signal by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const Signal = new dtoSignal();
  if (req.body.signalName) { Signal.signalName = req.body.signalName; }
  if (req.body.signalDelete) { Signal.signalDeletionDate = new Date(); }

  signalModel.update(Signal.toJSON, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'señal actualizada'
        });
      } else {
        res.send({
          message: `Con estos datos no se puede actualizar la señal con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error actualizando la señal con id=' + id + ' ' + err.message
      });
    });
};

// Delete a signal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  signalModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'señal borrada con éxito'
        });
      } else {
        res.send({
          message: `No se puede borrar la señal con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'No se puede borrar la señal con id=' + id + '. Error: ' + err.message
      });
    });
};

// Delete all signals from the database.
exports.deleteAll = (req, res) => {
  signalModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} señales borradas con éxito` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error al borrar todos las señales: ' + err.message
      });
    });
};