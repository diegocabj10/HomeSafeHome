const express = require('express');
const events = require('./events.route');

module.exports = function (app) {

  // simple route
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to HSH application.' });
  });

  //routes
  app.use('/api/events', events);

}




