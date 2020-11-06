const audits = require('./audits.controller');

const router = require('express').Router();

// Retrieve all auditss
router.get('/', audits.findAll);

module.exports = router;