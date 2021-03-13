// Importamos las bibliotecas
var express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors');

var app = express();


//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

/*********************** Mongoose Configuration *******************************/
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Freshratings:Equipo18FreshRatings@cluster0.etjir.mongodb.net/FreshRatings?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  }
).then(() => {
  console.log("MongoDB successfully connected...")
}).catch((err) => console.log(err.message))

mongoose.set("debug", true);

require("./models/User");
require('./config/passport');
// Aquí se importarán los modelos Mascota y Solicitud cuando estén listos

/*********************** Mongoose Configuration *******************************/

// Rutas
app.use('/v1', require('./routes'));

//Error 404
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// Iniciando el servidor
var server = app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on port ' + server.address().port);
});