const auditprocesses = require('./auditprocesses.controller');

const router = require('express').Router();

// Retrieve all audits
router.get('/', auditprocesses.findAll);

module.exports = router;