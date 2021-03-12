// Estructura del CRUD
const router = require('express').Router();

 const {
     addMovie,
     getAllMovies,
     modifyMovie,
     deleteMovie,
     addScore
 } = require('../controllers/movies.controller')

router.get('/', getAllMovies)
router.post('/', addMovie)
//router.put('/:id', modifyMovie)
//router.delete('/:id', deleteMovie)

module.exports = router;
