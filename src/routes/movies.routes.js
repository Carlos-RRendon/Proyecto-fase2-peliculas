// Estructura del CRUD
const router = require('express').Router();

 const {
     addMovie,
     getMovies,
     deleteMovie,
     findAndFilter
 } = require('../controllers/movies.controller')

 //Rutas del CRUD

 //Read
router.post('/search', findAndFilter)
router.get('/', getMovies)
router.get('/:id', getMovies)

//Create
router.post('/', addMovie)

//Delete
router.delete('/:id', deleteMovie)

module.exports = router;
