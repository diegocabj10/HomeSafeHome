require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');
const db = require('./config/db.config');
const cors = require('cors');

const { login, authenticate } = require('./app/Core/authentication');

const routeEvents = require('./app/Events/events.route');
const routeDevices = require('./app/Devices/devices.route');
const routeNotifications = require('./app/Notifications/notifications.route');

var corsOptions = {
  origin: 'http://localhost:8080'
};

const app = express();
db.sync();



app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


//Defining routes
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome everybody to HSH application.' });
});



app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/events', routeEvents);
app.use('/api/devices', routeDevices);
app.use('/api/notifications', routeNotifications);
app.use('/api/login', login);





// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
