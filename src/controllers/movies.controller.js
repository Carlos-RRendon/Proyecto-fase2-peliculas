//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');

//CREATE
function addMovie(req, res) {
    //Aqui va el codigo para agregar peliculas en la DB
    /*
    const user = new User({
        username: "carls.12002",
        name: "Carlos",
        lastName: "Ramirez",
        email: "carlos.as@outlook.com",
        password: "elPAtitofeo123",
        age:23,
        type: "admin"
    });

    const movie = new Movie({
        movie: {
            title: 'Star Wars',
            image: 'path/to/image.jpg',
            genre: ['Animation'],
            // synopsis: 'Era una vez un niño chiquito',
            classification: 'PG-13',
            duration: 123,
            director: 'Jackie Chan',
            // cast: ['Robert Downey Jr.','Chris Hemsworth'],
            originalLanguage: 'Español',
            releaseYear: 1995
        },
        score: [
            {
            user : user._id,
            calification: 9.4
            }
        ]
    });

    const JSONRes = {
        user,
        movie
    } 
    */
   const {movie, score} = req.body;
   
   const newMovie = new Movie({movie,score})
   error = newMovie.validate()
   .then( value => {res.send('Successfully added')} )
   .catch( e => res.send(e.message))
//    res.send(error)
   
    // .then( movie => {res.status(201).send('Movie added successfully')})
    // .catch( e => {res.status(500).send(e.message)} );
};

//READ
function getMovie(req, res) {
    //Aqui va el codigo para  hacer consultas de peliculas en la DB
    // Similación de una película y regresándolas
    var movie1 = new Movie(1, 'Fight Club', 'Drama, Mystery And Thriller', 'Una peli muy chida', 9.3, 'R', '2hr 19m', 'David Fincher', 'Brad Pitt, Helena Carter', 'English', 'Oct 15, 1999')
    res.send([movie1])
};

//UPDATE
function modifyMovie(req, res) {
    //Aqui va el codigo para modificar peliculas en la DB
    // Simulación de una película previamente existente que el cliente modifica
    var movie1 = new Movie(req.params.id, 'Fight Club', 'Drama, Mystery And Thriller', 'Una peli muy chida', 9.3, 'R', '2hr 19m', 'David Fincher', 'Brad Pitt, Helena Carter', 'English', 'Oct 15, 1999')
    var modifications = req.body
    movie1 = {
        ...movie1,
        ...modifications
    }
    res.send(movie1)
};

//DELETE
function deleteMovie(req, res) {
    //Aqui va el codigo para eliminar peliculas en la DB
    //Simulación de una eliminación de movie, regresando un 200
    res.status(200).send(`Movie ${req.params.id} eliminada`);
};

function addScore(req, res) {
    //Aqui va el codigo para agregar calificacion a las peliculas de la DB
}

//Exportamos las funciones definidas
module.exports = {
    addMovie,
    getMovie,
    modifyMovie,
    deleteMovie,
    addScore
}