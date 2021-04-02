
const notifications = require('./notifications.controller');
const router = require('express').Router();

// Retrieve all Notifications
router.get('/', notifications.findAll);

// Retrieve a single Notification with id
router.get('/:id', notifications.findOne);

module.exports = router;