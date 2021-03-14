const app = require('./server');
require('./db');


// Iniciando el servidor
var server = app.listen( app.get('port'), ()=> {
  console.log(`Listening on port: ${app.get('port')}`);
});