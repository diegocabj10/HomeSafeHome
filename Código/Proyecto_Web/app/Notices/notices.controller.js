const db = require('../../config/db.config');
const dtoNotice = require('./notices.dto');
const NoticeModel = require('./notices.model');
const { getPagination, getPagingData } = require('../Core/pagination');
const Op = db.Sequelize.Op;

// Create and Save a new notice
exports.create = async (req, res) => {

  // Validate request
  if (!req.body.noticeTitle || !req.body.noticeMessage) {
    res.status(400).send({
      message: 'Debe ingresar título y mensaje'
    });
    return;
  }

  // Create an notice
  const Notice = new dtoNotice(new Date(), req.body.noticeTitle, req.body.noticeMessage, req.body.noticeUserId);

  // Save notice in the database
  NoticeModel.create(Notice.toJSON)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error dando de alta el aviso: ' + err.message
      });
    });

}

// Retrieve all notices from the database.
exports.findAll = (req, res) => {
  const { page, size, noticeTitle, noticeMessage } = req.query;
  var condition = noticeTitle ? { titulo: { [Op.like]: `%${noticeTitle}%` } } : null;
  condition = condition + noticeTitle ? { mensaje: { [Op.like]: `%${noticeMessage}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  NoticeModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error buscando los avisos: ' + err.message })
    });
};

// Find a single notice with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  NoticeModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error buscando el aviso con id=' + id
      });
    });
};

// Update a notice by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const Notice = new dtoNotice();
  if (req.body.noticeTitle) { Notice.noticeTitle = req.body.noticeTitle; }
  if (req.body.noticeMessage) { Notice.noticeMessage = req.body.noticeMessage; }
  if (req.body.noticeUserId) { Notice.noticeUserId = req.body.noticeUserId; }
  if (req.body.noticeDelete) { Notice.noticeDeletionDate = new Date(); }

  NoticeModel.update(Notice.toJSON, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Aviso actualizado'
        });
      } else {
        res.send({
          message: `Con estos datos no se puede actualizar el aviso con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error actualizando el aviso con id=' + id
      });
    });
};

// Delete a notice with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  NoticeModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'aviso borrado con éxito'
        });
      } else {
        res.send({
          message: `No se puede borrar el aviso con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'No se puede borrar el aviso con id=' + id + '. Error: ' + err.message
      });
    });
};

// Delete all notices from the database.
exports.deleteAll = (req, res) => {
  NoticeModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} avisos borrados con éxito` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error al borrar todos los avisos: ' + err.message
      });
    });
};