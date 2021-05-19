require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = require('./swagger.json');
const swaggerSpecifications = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./app/Core/*/*.swagger.js', './app/Features/*/*.swagger.js'],
});
const db = require('./config/db.config');
const corsOptions = require('./config/cors.config');

const { authenticate } = require('./app/Core/Authentications/authenticate.middleware');

const routeAuthentications = require('./app/Core/Authentications/authentications.route');
const routeClaims = require('./app/Features/Claims/claims.route');
const routeDevices = require('./app/Features/Devices/devices.route');
const routeEvents = require('./app/Features/Events/events.route');
const routeNotifications = require('./app/Features/Notifications/notifications.route');
const routeSignals = require('./app/Features/Signals/signals.route');
const routeNotices = require('./app/Features/Notices/notices.route');
const routeContacts = require('./app/Features/Contacts/contacts.route');



const app = express();
db.sync();

app.use(express.static('./public'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  '/api/docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecifications, { explorer: true })
);


app.use('/api/authentications', routeAuthentications);
app.use('/api/claims', authenticate, routeClaims);
app.use('/api/notices', authenticate, routeNotices);
app.use('/api/devices', authenticate, routeDevices);
app.use('/api/events', routeEvents);
app.use('/api/notifications', authenticate, routeNotifications);
app.use('/api/signals', authenticate, routeSignals);
app.use('/api/contacts', authenticate, routeContacts);



app.get('/', (req, res) => {
  res.render('index.html');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
