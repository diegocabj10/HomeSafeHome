
    const events = require('./event.controller');
  
    const router = require('express').Router();

   
    // Create a new Event
    router.post('/', events.create);
  
    // Retrieve all Events
    router.get('/', events.findAll);
  
    // Retrieve all published Events
    router.get('/published', events.findAllPublished);
  
    // Retrieve a single Event with id
    router.get('/:id', events.findOne);
  
    // Update a Event with id
    router.put('/:id', events.update);
  
    // Delete a Event with id
    router.delete('/:id', events.delete);
  
    // Delete all Events
    router.delete('/', events.deleteAll);
  
     
    module.exports = router;