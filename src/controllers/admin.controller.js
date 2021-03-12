//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');
const allMovies = require('../../mongo/movies.json')
const allUsers = require('../../mongo/usuarios.json')


//CREATE
function populateMoviesDb(req, res) {

    allMovies.forEach( movie =>{
        movie = new Movie( movie )
        movie.save()
        .then( s => console.log(`Movie ${movie.movie._id} : ${movie.movie.title} successfully added`) )
        .catch( e => console.log(`Error ${e}.
         On ${movie.movie._id} : ${movie.movie.title}`))
    });
    res.send('all right pinguino rodriguez')
    
    

};

function populateUsersDb(req,res){
    allUsers.forEach( user =>{
        user = new User( user )
        user.save()
        .then( s => console.log(`User ${user._id} : ${user.username} successfully added`) )
        .catch( e => console.log(`Error ${e}.
         On ${user._id} : ${user.username}`))
    });
    res.send('Im listening you')
}



//Exportamos las funciones definidas
module.exports = {
    populateMoviesDb,
    populateUsersDb
}