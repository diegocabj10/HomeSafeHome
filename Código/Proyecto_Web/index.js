const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeEvents = require('./app/Events/events.route');
const routeDevices = require('./app/Devices/devices.route');
const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8080'
};


const db = require('./config/db.config');
db.sync();


//Example of middleware of route /
// app.use('/',function (req, res, next) {
//   next();
// });


app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));




//Defining routes
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome everybody to HSH application.' });
});

app.use('/api/events', routeEvents);
app.use('/api/devices', routeDevices);




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
