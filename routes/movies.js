// Estructura del CRUD
const router = require('express').Router();

const {
    addMovie,
    getMovie,
    modifyMovie,
    deleteMovie,
    addScore
} = require('../controllers/movies')

router.get('/', getMovie)
router.post('/', addMovie)
router.put('/:id', modifyMovie)
router.delete('/:id', deleteMovie)

module.exports = router;
