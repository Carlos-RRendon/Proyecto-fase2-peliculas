// Importamos las bibliotecas
var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors');

var app = express();


//Middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.use('/v1', require('./routes'));

//Error 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



// Iniciando el servidor
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Escuchando en el puerto ' + server.address().port);
});