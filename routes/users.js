// Estructura del CRUD
const router = require('express').Router();

const {
    addUser,
    getUsers,
    modifyUser,
    deleteUser,
    signIn,
    signOut
} = require('../controllers/users')

router.get('/', getUsers)
router.post('/', addUser)
router.put('/:id', modifyUser)
router.delete('/:id', deleteUser)

module.exports = router;