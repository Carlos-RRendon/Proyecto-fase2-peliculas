//Module Imports
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan');

const {PORT, HOST, ENV} = require('./config/config')

//Initializations
const app = express();

//Settings
app.set('port', PORT);



//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
if ( ENV === 'development' ){
    app.use(morgan('dev'));
}


//Global variables


//Routes
app.use('/v1', require('./routes/index.routes'));

if ( ENV === 'development'){
    //Routes to populate db with JSON
    app.use('/admin', require('./routes/admin.routes'));
}


// //Error 404
//  app.use( (err,req, res, next) => {
//      //var err = new Error('Not Found');
//      //err.status = 404;
//      //console.error(err.stack);
//      //res.status(404).send('Not Found')
//      //console.error(err)
//      console.error(err.track);
//      res.status(500).sent('Not found')
     
//    });

//Static files


module.exports = app;