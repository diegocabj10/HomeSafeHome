const db = require('../../config/db.config');
const dtoClaim = require('./claims.dto');
const ClaimModel = require('./claims.model');
const { getPagination, getPagingData } = require('../Core/pagination');
const Op = db.Sequelize.Op;

// Create and Save a new claim
exports.create = async (req, res) => {

  // Validate request
  if (!req.body.claimTitle || !req.body.claimMessage) {
    res.status(400).send({
      message: 'Debe ingresar título y mensaje'
    });
    return;
  }

  // Create a claim
  const Claim = new dtoClaim(new Date(), req.body.claimTitle, req.body.claimMessage, req.body.claimUserId);

  // Save claim in the database
  ClaimModel.create(Claim.toJSON)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error dando de alta el reclamo: ' + err.message
      });
    });

}

// Retrieve all claims from the database.
exports.findAll = (req, res) => {
  const { page, size, claimTitle, claimMessage } = req.query;
  var condition = claimTitle ? { titulo: { [Op.like]: `%${claimTitle}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  ClaimModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error buscando los reclamos: ' + err.message })
    });
};

// Find a single claim with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ClaimModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error buscando el reclamo con id=' + id
      });
    });
};

// Update a claim by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const Claim = new dtoClaim();
  if (req.body.claimTitle) { Claim.claimTitle = req.body.claimTitle; }
  if (req.body.claimMessage) { Claim.claimMessage = req.body.claimMessage; }
  if (req.body.claimResponse) { Claim.claimResponse = req.body.claimResponse; }
  if (req.body.claimDelete) { Claim.claimDeletionDate = new Date(); }

  ClaimModel.update(Claim.toJSON, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'reclamo actualizado'
        });
      } else {
        res.send({
          message: `Con estos datos no se puede actualizar el reclamo con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error actualizando el reclamo con id=' + id
      });
    });
};

// Delete a claim with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ClaimModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'reclamo borrado con éxito'
        });
      } else {
        res.send({
          message: `No se puede borrar el reclamo con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'No se puede borrar el reclamo con id=' + id + '. Error: ' + err.message
      });
    });
};

// Delete all claims from the database.
exports.deleteAll = (req, res) => {
  ClaimModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} reclamos borrados con éxito` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error al borrar todos los reclamos: ' + err.message
      });
    });
};