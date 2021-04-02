require('dotenv').config({ path: './config/config.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerDefinition = require('./swagger.json');
const swaggerSpecifications = swaggerJSDoc({
  swaggerDefinition,
  apis: ['./app/*/*.swagger.js','./app/Features/*/*.swagger.js'],
});
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

app.use(express.static('./public'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded());
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


app.get('/', (req, res) => {
  res.render('index.html');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
