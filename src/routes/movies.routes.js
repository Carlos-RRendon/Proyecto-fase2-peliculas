// Estructura del CRUD
const router = require('express').Router();

 const {
     addMovie,
     getMovies,
     modifyMovie,
     deleteMovie,
     addScore,
     getMoviebyId
 } = require('../controllers/movies.controller')

router.get('/', getMovies)
router.get('/:id', getMovies)
router.post('/', addMovie)

//router.put('/:id', modifyMovie)
//router.delete('/:id', deleteMovie)

module.exports = router;
