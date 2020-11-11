
const notifications = require('./notifications.controller');
const router = require('express').Router();

// Retrieve all Notifications
router.get('/', notifications.findAll);

// Retrieve a single Notification with id
router.get('/:id', notifications.findOne);

// Update a Notification with id
router.put('/:id', notifications.update);

// Delete a Notification with id
router.delete('/:id', notifications.delete);

// Delete all Notifications
router.delete('/', notifications.deleteAll);

module.exports = router;