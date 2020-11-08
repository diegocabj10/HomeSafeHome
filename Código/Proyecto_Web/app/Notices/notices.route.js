const notices = require('./notices.controller');

const router = require('express').Router();

// Create a new user
router.post('/', notices.create);

// Retrieve all notices
router.get('/', notices.findAll);

// Retrieve a single user with id
router.get('/:id', notices.findOne);

// Update a user with id
router.put('/:id', notices.update);

// Delete a user with id
router.delete('/:id', notices.delete);

// Delete all notices
router.delete('/', notices.deleteAll);

module.exports = router;
