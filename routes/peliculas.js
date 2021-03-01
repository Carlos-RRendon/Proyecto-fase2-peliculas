// Estructura del CRUD
const router = require('express').Router();

const {
    agregarPelicula,
    consultarPelicula,
    modificarPelicula,
    eliminarPelicula,
    agregarCalificacion
} = require('../controllers/peliculas')

router.get('/', consultarPelicula)
router.post('/', agregarPelicula)
router.put('/:id', modificarPelicula)
router.delete('/:id', eliminarPelicula)

module.exports = router;