//Movie.js
//Clase que representa a una pelicula
/*
class Movie{
    constructor(id, titulo, genero, sinopsis, calificacion, clasificacion, duracion, director, actores, idiomaOriginal, fechaEstreno){
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.sinopsis = sinopsis;
        this.calificacion = calificacion;
        this.clasificacion = clasificacion;
        this.duracion = duracion;
        this.director = director;
        this.idiomaOriginal = idiomaOriginal;
        this.actores = actores;
        this.fechaEstreno = fechaEstreno
    }
}

module.exports = Movie
*/


/*
const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
    movie: {
        title: {
            type: String,
            required: [true, "It could not be empty"],
            index: true
        },
        genre: [{
            type: String,
            required: [true, "It could not be empty"],
            index: true
        }],
        synopsis: {
            type: String,
            required: true
        },
        runtime: {
            type: String,
            required: [true, "It could not be empty"]
        },
        director: {
            type: String,
            required: [true, "It could not be empty"],
            index: true
        },
        originalLanguage: {
            type: String,
            required: [true, "It could not be empty"],
            index: true
        },
        cast: {
            type: [String],
            required: [true, "It could not be empty"],
            index: true
        },
        releaseDate: [{
            type: Number,
        }],
    },
    rating: [{
        user: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, "It could not be empty"],
            match: [/^[a-zA-Z0-9]+$/, "Invalid data"],
            index: true
        },
        rating: {
            type: Number,
            index: true
        }
    }]
}, {
    timestamps: true
});


// usando plugin de validación para que no se repitan correos ni usernames
MovieSchema.plugin(uniqueValidator, {
    message: "It already exists"
});
*/