// Estructura del CRUD
const router = require('express').Router();

 const {
     populateMoviesDb,
     populateUsersDb,
    
 } = require('../controllers/admin.controller')

router.post('/Movies', populateMoviesDb)
router.post('/Users', populateUsersDb)

module.exports = router;