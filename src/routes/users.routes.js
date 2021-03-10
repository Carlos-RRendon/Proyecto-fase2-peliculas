// Estructura del CRUD
const router = require('express').Router();

const {
    addUser,
    getUser,
    modifyUser,
    deleteUser,
    signIn,
    signOut
} = require('../controllers/users.controller');

 //router.get('/', getUser)
 router.post('/', addUser);
 //router.put('/:id', modifyUser)
 //router.delete('/:id', deleteUser)

module.exports = router;