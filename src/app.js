const app = require('./server');
require('./db');


// Iniciando el servidor
var server = app.listen( app.get('port'),app.get('host'), ()=> {
  console.log(`Listening on: https://${app.get('host')}:${app.get('port')}`);
});