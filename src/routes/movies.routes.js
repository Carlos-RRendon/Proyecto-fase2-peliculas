// Estructura del CRUD
const router = require('express').Router();

 const {
     addMovie,
     getMovies,
     deleteMovie,
     updateByAtribute,
     updateMovie,
     findAndFilter
 } = require('../controllers/movies.controller')

//Rutas del CRUD

//Read
router.post('/search', findAndFilter)
router.get('/', getMovies)
router.get('/:id', getMovies)

//Create
router.post('/', addMovie)

 //Update
 router.post('/:id/search', updateByAtribute)
 router.post('/:id', updateMovie)

//Delete
router.delete('/:id', deleteMovie)

module.exports = router;
