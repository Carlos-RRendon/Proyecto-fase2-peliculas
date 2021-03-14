// Estructura del CRUD
const router = require('express').Router();

 const {
     addMovie,
     getMovies,
     findByAttribs,
     modifyMovie,
     deleteMovie,
     addScore,
     getMoviebyId,
     findAndFilter
 } = require('../controllers/movies.controller')


router.post('/search', findAndFilter)
router.get('/', getMovies)
router.get('/:id', getMovies)
router.post('/', addMovie)

//router.put('/:id', modifyMovie)
router.delete('/:id', deleteMovie)

module.exports = router;
