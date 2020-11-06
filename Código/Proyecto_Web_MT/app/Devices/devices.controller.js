const db = require('../../config/db.config');
const dtoDevice = require('./devices.dto');
const deviceModel = require('./devices.model');
const { getPagination, getPagingData } = require('../Core/pagination');
const Op = db.Sequelize.Op;

// Create and Save a new dispositivo
exports.create = async (req, res) => {

  // Validate request
  if (!req.body.deviceName) {
    res.status(400).send({
      message: 'Debe ingresar nombre'
    });
    return;
  }

  // Create a dispositivo
  const Device = new dtoDevice(req.body.deviceName);

  // Save dispositivo in the database
  deviceModel.create(Device.toJSON)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error dando de alta el dispositivo: ' + err.message
      });
    });

}

// Retrieve all dispositivos from the database.
exports.findAll = (req, res) => {
  const { page, size, deviceName } = req.query;
  var condition = deviceName ? { n_dispositivo: { [Op.like]: `%${deviceName}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  deviceModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error buscando los dispositivos: ' + err.message })
    });
};

// Find a single dispositivo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  deviceModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error buscando el dispositivo con id=' + id
      });
    });
};

// Update a dispositivo by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const Device = new dtoDevice();
  if (req.body.deviceName) { device.deviceName = req.body.deviceName }

  deviceModel.update(Device.toJSON, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Dispositivo actualizado'
        });
      } else {
        res.send({
          message: `Con estos datos no se puede actualizar el dispositivo con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error actualizando el dispositivo con id=' + id + ' ' + err.message
      });
    });
};

// Delete a dispositivo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  deviceModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Dispositivo borrado con éxito'
        });
      } else {
        res.send({
          message: `No se puede borrar el dispositivo con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'No se puede borrar el dispositivo con id=' + id + '. Error: ' + err.message
      });
    });
};

// Delete all dispositivos from the database.
exports.deleteAll = (req, res) => {
  deviceModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} dispositivos borrados con éxito` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error al borrar todos los dispositivos: ' + err.message
      });
    });
};

