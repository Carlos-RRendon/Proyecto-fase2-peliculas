//Importando el modelo de usuario
const Usuario = require('../models/Usuario')

//CREATE
function agregarUsuario(req, res) {
    //Aqui va el codigo para agregar usuarios en la DB
    var usuario = new Usuario(req.body)
    res.status(201).send(usuario)
};

//UPDATE
function modificarUsuario(req, res) {
    //Aqui va el codigo para modificar usuarios en la DB
    // Simulación de un usuario previamente existente que el cliente modifica
    var usuario1 = new Usuario(req.params.id, 'Vicente', 'Guerrero', 55, 'vicente.g@gmail.com', '123456', 'admin', '25-feb-2021')
    var modificaciones = req.body
    usuario1 = {
        ...usuario1,
        ...modificaciones
    }
    res.send(usuario1)
};

//DELETE
function eliminarUsuario(req, res) {
    //Aqui va el codigo para  hacer eliminar usuarios en la DB
    //Simulación de una eliminación de un usuario, regresando un 200
    res.status(200).send(`Usuario ${req.params.id} eliminado`);
};

function iniciarSesion(req, res) {
    //Aqui va el codigo para autenticar el inicio de sesion en la DB
};

function cerrarSesion(req, res) {
    //Aqui va el codigo para cerrar sesion
}


//Exportamos las funciones definidas
module.exports = {
    agregarUsuario,
    modificarUsuario,
    eliminarUsuario,
    iniciarSesion,
    cerrarSesion
}