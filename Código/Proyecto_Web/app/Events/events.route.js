
const events = require('./events.controller');
const router = require('express').Router();

// Create a new Event
router.post('/', events.create);

module.exports = router;