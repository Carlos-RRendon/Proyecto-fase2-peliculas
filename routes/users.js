// Estructura del CRUD
const router = require('express').Router();

const {
    createUser,
    updateUser,
    deleteUser,
    logIn
} = require('../controllers/users')
const auth = require('./auth');

router.post('/', createUser)
router.post('/login', logIn)
router.put('/:id', auth.required, updateUser)
router.delete('/:id', auth.required, deleteUser)

module.exports = router;