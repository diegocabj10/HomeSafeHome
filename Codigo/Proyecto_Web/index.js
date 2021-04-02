require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = require('./swagger.json');
const db = require('./config/db.config');
const corsOptions = require('./config/cors.config');

const { authenticate } = require('./app/Authentications/authenticate.middleware');

const routeAuthentications = require('./app/Authentications/authentications.route');
const routeClaims = require('./app/Features/Claims/claims.route');
const routeDevices = require('./app/Features/Devices/devices.route');
const routeEvents = require('./app/Features/Events/events.route');
const routeNotifications = require('./app/Features/Notifications/notifications.route');
const routeSignals = require('./app/Features/Signals/signals.route');
const routeNotices = require('./app/Features/Notices/notices.route');



const app = express();
db.sync();

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
app.use(cookieParser());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded());

//Defining routes
// simple route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome everybody to services of Home Safe Home.' });
});

const swaggerSpecifications = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./app/Features/*/*.swagger.js'],
});

app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecifications, { explorer: true })
);

app.use('/api/authentications', routeAuthentications);
app.use('/api/claims', routeClaims);
app.use('/api/notices', routeNotices);
app.use('/api/devices', routeDevices);
app.use('/api/events', routeEvents);
app.use('/api/notifications', routeNotifications);
app.use('/api/signals', routeSignals);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
