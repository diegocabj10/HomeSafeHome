require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const db = require("./config/db.config");
const swaggerDocument = require("./swagger.json");
const { authenticate } = require("./app/Core/authenticate.middleware");
const routeAuthentications = require("./app/Authentications/authentications.route");
const routeEvents = require("./app/Events/events.route");
const routeDevices = require("./app/Devices/devices.route");
const routeNotifications = require("./app/Notifications/notifications.route");
const routeSignals = require("./app/Signals/signals.route");

var corsOptions = {
  origin: "http://localhost:8080",
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
app.get("/", (req, res) => {
  res.json({ message: "Welcome everybody to HSH application." });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/events", routeEvents);
app.use("/api/devices", routeDevices);
app.use("/api/signals", routeSignals);
app.use("/api/notifications", authenticate, routeNotifications);
app.use("/api/authentications", routeAuthentications);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
