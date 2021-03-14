// Estructura del CRUD
const router = require('express').Router();

 const {
     addMovie,
     getMovies,
     deleteMovie,
     findAndFilter,
     totalUpdate,
     partialUpdate
 } = require('../controllers/movies.controller')

 //Rutas del CRUD

 //Read
router.post('/search', findAndFilter)
router.get('/', getMovies)
router.get('/:id', getMovies)

//Update
router.put("/:id/search",partialUpdate)
router.put('/:id',totalUpdate)


//Create
router.post('/', addMovie)

//Delete
router.delete('/:id', deleteMovie)

module.exports = router;
