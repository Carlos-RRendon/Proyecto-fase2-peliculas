// importamos las dependencias necesarias
var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('Welcome to Fresh Ratings 🥵');
});

router.use('/usuarios', require('./usuarios'));
router.use('/peliculas', require('./peliculas'));

// exportamos nuestro nuevo router
module.exports = router;