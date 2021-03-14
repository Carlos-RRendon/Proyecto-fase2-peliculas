//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');
const allMovies = require('../../mongo/movies.json')
const allUsers = require('../../mongo/usuarios.json')

const adminCtrl = {}

//CREATE MOVIES
adminCtrl.populateMoviesDb = (req, res) => {

    allMovies.forEach( movie =>{
        movie = new Movie( movie )
        movie.save()
        .then( s => console.log(`Movie ${movie.movie._id} : ${movie.movie.title} successfully added`) )
        .catch( e => console.log(`Error ${e}.
         On ${movie.movie._id} : ${movie.movie.title}`))
    });
    res.send('Added correctly')
    
    

};
//Create Users
adminCtrl.populateUsersDb = (req,res,next) => {
    allUsers.forEach( async user =>{
        user = new User( user );
        try{
            user.password = await user.encryptPassword( user.password )
        }  catch (e) {next}
        user.save()
        .then( s => console.log(`User ${user._id} : ${user.username} successfully added`) )
        .catch( e => console.log(`Error ${e}.
         On ${user._id} : ${user.username}`))
    });
    res.send('Added correctly')
}



//Exportamos las funciones definidas
module.exports = adminCtrl