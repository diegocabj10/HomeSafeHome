const signals = require('./signals.controller');

const router = require('express').Router();

// Create a new Device
router.post('/', signals.create);

// Retrieve all signals
router.get('/', signals.findAll);

// Retrieve a single Device with id
router.get('/:id', signals.findOne);

// Update a Device with id
router.put('/:id', signals.update);

// Delete a Device with id
router.delete('/:id', signals.delete);

// Delete all signals
router.delete('/', signals.deleteAll);

module.exports = router;