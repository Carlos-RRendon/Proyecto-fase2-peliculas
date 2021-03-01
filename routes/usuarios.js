// Estructura del CRUD
const router = require('express').Router();

const {
    agregarUsuario,
    obtenerUsuarios,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion,
    cerrarSesion
} = require('../controllers/usuarios')

router.get('/', obtenerUsuarios)
router.post('/', agregarUsuario)
router.put('/:id', modificarUsuario)
router.delete('/:id', eliminarUsuario)

module.exports = router;