// importamos las dependencias necesarias
var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('🎬🧐 Welcome to Fresh Ratings!! 🎬🧐');
});

router.use('/users', require('./users.routes'));
router.use('/movies', require('./movies.routes'));
//Route to populate db with restrictions
router.use('/admin', require('./admin.routes'));

// exportamos nuestro nuevo router
module.exports = router;