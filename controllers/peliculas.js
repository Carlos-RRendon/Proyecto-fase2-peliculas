//Importando el modelo de pelicula
const Pelicula = require('../models/Pelicula')

function agregarPelicula(req, res) {
    //Aqui va el codigo para agregar peliculas en la DB
};

function consultarPelicula(req, res) {
    //Aqui va el codigo para  hacer consultas de peliculas en la DB
};

function modificarPelicula(req, res) {
    //Aqui va el codigo para modificar peliculas en la DB
};

function eliminarPelicula(req, res) {
    //Aqui va el codigo para eliminar peliculas en la DB
};

function agregarCalificacion(req, res) {
    //Aqui va el codigo para agregar calificacion a las peliculas de la DB
}

//Exportamos las funciones definidas
module.exports = {
    agregarPelicula,
    consultarPelicula,
    modificarPelicula,
    eliminarPelicula,
    agregarCalificacion
}