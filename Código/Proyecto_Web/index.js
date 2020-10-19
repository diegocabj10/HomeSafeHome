const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routeEvents = require('../Events/events.route');

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:8081'
};


const db = require('./config/db.config');
db.sync();



// Middleware function: funciones que toman el request
// y pueden terminar el ciclo de request/response o 
// pasar el control hacia otro middleware function
//Ejemplo de middleware para todas las rutas
// app.use(function (req, res, next) {
//   next();
// });
//Ejemplo de un middleware aplicada a una sola ruta
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




// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
