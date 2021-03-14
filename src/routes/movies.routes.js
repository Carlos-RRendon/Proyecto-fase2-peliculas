// Estructura del CRUD
const router = require('express').Router();

 const {
     addMovie,
     getMovies,
     findByAttribs,
     updateByAtribute,
     updateMovie,
     modifyMovie,
     deleteMovie,
     addScore,
     getMoviebyId
 } = require('../controllers/movies.controller')


router.get('/search', findByAttribs )
router.get('/', getMovies)
router.get('/:id', getMovies)
router.post('/', addMovie)
router.post('/:id/search', updateByAtribute) //este es el bueno
router.get('/:id/search', updateByAtribute) //este es para prueba
router.post('/:id', updateMovie)


//router.put('/:id', modifyMovie)
//router.delete('/:id', deleteMovie)

module.exports = router;
