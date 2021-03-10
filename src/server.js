//Module Imports
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan');

const {PORT, HOST} = require('./config/config')

//Initializations
const app = express();

//Settings
app.set('port', PORT);
app.set('host',HOST);


//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
//app.use(bodyParser.json());


//Global variables


//Routes
//app.use('/v1', require('./routes/index.routes'));


//Error 404
app.use( (req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

//Static files


module.exports = app;