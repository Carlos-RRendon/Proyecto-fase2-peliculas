//Importando el modelo de pelicula
const Pelicula = require('../models/Pelicula')

//CREATE
function agregarPelicula(req, res) {
    //Aqui va el codigo para agregar peliculas en la DB
    var pelicula = new Pelicula(req.body)
    res.status(201).send(pelicula)
};

//READ
function consultarPelicula(req, res) {
    //Aqui va el codigo para  hacer consultas de peliculas en la DB
    // Similación de una película y regresándolas
    var pelicula1 = new Pelicula(1, 'Fight Club', 'Drama, Mystery And Thriller', 'Una peli muy chida', 9.3, 'R', '2hr 19m', 'David Fincher', 'Brad Pitt, Helena Carter', 'English', 'Oct 15, 1999')
    res.send([pelicula1])
};

//UPDATE
function modificarPelicula(req, res) {
    //Aqui va el codigo para modificar peliculas en la DB
    // Simulación de una película previamente existente que el cliente modifica
    var pelicula1 = new Pelicula(req.params.id, 'Fight Club', 'Drama, Mystery And Thriller', 'Una peli muy chida', 9.3, 'R', '2hr 19m', 'David Fincher', 'Brad Pitt, Helena Carter', 'English', 'Oct 15, 1999')
    var modificaciones = req.body
    pelicula1 = {
        ...pelicula1,
        ...modificaciones
    }
    res.send(pelicula1)
};

//DELETE
function eliminarPelicula(req, res) {
    //Aqui va el codigo para eliminar peliculas en la DB
    //Simulación de una eliminación de pelicula, regresando un 200
    res.status(200).send(`Pelicula ${req.params.id} eliminada`);
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