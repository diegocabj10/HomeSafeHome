const db = require('../../config/db.config');
const dtoUser = require('./users.dto');
const UserModel = require('./users.model');
const { getPagination, getPagingData } = require('../Core/pagination');
const Op = db.Sequelize.Op;


// Create and Save a new User
exports.create = async (req, res) => {

  // Validate request
  if (!req.body.userEmail || !req.body.userPassword) {
    return res.status(400).send({
      message: 'Debe ingresar email y password'
    });

  }

  // Create a User
  const User = new dtoUser(new Date(), req.body.userEmail, req.body.userPassword, req.body.userName, req.body.userSurname);

  // Save User in the database
  UserModel.create(User.toJSON)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error dando de alta al usuario: ' + err.message
      });
    });

}

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const { page, size, userEmail } = req.query;
  var condition = userEmail ? { email: { [Op.like]: `%${userEmail}%` } } : null;

  const { limit, offset } = getPagination(page, size);

  UserModel.findAndCountAll({ where: condition, limit, offset })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({ message: 'Error buscando los usuarios: ' + err.message })
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  UserModel.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error buscando el usuario con id=' + id
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  const User = new dtoUser();
  if (req.body.userEmail) { User.userEmail = req.body.userEmail; }
  if (req.body.userPassword) { User.userPassword = req.body.userPassword; }
  if (req.body.userName) { User.userName = req.body.userName; }
  if (req.body.userSurname) { User.userSurname = req.body.userSurname; }
  if (req.body.userDelete) { User.userDeletionDate = new Date(); }

  UserModel.update(User.toJSON, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Usuario actualizado'
        });
      } else {
        res.send({
          message: `Con estos datos no se puede actualizar el usuario con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'Error actualizando el usuario con id=' + id + ' ' + err.message
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  UserModel.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Usuario borrado con éxito'
        });
      } else {
        res.send({
          message: `No se puede borrar el usuario con id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: 'No se puede borrar el usuario con id=' + id + '. Error: ' + err.message
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  UserModel.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} usuarios borrados con éxito` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          'Error al borrar todos los usuarios: ' + err.message
      });
    });
};