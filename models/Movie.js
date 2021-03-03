//Movie.js
//Clase que representa a una pelicula

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