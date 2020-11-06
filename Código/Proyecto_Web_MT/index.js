const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeEvents = require('./app/Events/events.route');
const routeDevices = require('./app/Devices/devices.route');
const routeSignals = require('./app/Signals/signals.route');
const routeUsers = require('./app/Users/users.route');
const routeNotices = require('./app/Notices/notices.route');
const routeClaims = require('./app/Claims/claims.route');
const routeAudits = require('./app/Audits/audits.route');
const routeAuditProcesses = require('./app/AuditProcesses/auditprocesses.route');

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8081'
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
  res.json({ message: 'Welcome to HSH application.' });
});

app.use('/api/events', routeEvents);
app.use('/api/devices', routeDevices);
app.use('/api/signals', routeSignals);
app.use('/api/users', routeUsers);
app.use('/api/notices', routeNotices);
app.use('/api/claims', routeClaims);
app.use('/api/audits', routeAudits);
app.use('/api/auditprocesses', routeAuditProcesses);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
