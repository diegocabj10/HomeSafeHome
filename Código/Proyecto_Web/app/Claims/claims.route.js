const claims = require('./claims.controller');
const router = require('express').Router();

// Create a new claim
router.post('/', claims.create);

// Retrieve all claims
router.get('/', claims.findAll);

// Retrieve a single claim with id
router.get('/:id', claims.findOne);

// Update a claim with id
router.put('/:id', claims.update);

// Delete a claim with id
router.delete('/:id', claims.delete);

// Delete all claims
router.delete('/', claims.deleteAll);

module.exports = router;