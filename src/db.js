//Conexion a la base de datos con mongoose

const mongoose = require('mongoose');

const { MONGODB_USER, MONGODB_PASS, MONGODB_DATABASE } = require('./config/config');

const MONGO_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@cluster0.etjir.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

mongoose.connect( MONGO_URI, { 
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
.then( db => console.log(`Your MongoDB ${MONGODB_DATABASE} is connected`))
.catch( err => console.log(err));