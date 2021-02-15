require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = require("./swagger.json");
const swaggerJSDoc = require("swagger-jsdoc");

const db = require("./config/db.config");

const {
  authenticate,
} = require("./app/Authentications/authenticate.middleware");
const routeAuthentications = require("./app/Authentications/authentications.route");
const routeClaims = require("./app/Claims/claims.route");
const routeDevices = require("./app/Devices/devices.route");
const routeEvents = require("./app/Events/events.route");
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
  res.json({ message: "Welcome everybody to services of Home Safe Home." });
});

const swaggerSpecifications = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./app/*/*.swagger.js"],
});

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpecifications, { explorer: true })
);

app.use("/api/authentications", routeAuthentications);
app.use("/api/claims", authenticate, routeClaims);
app.use("/api/devices", routeDevices);
app.use("/api/events", routeEvents);
app.use("/api/notifications", routeNotifications);
app.use("/api/signals", routeSignals);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
