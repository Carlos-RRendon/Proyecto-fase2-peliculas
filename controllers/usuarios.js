//Importando el modelo de usuario
const Usuario = require('../models/Usuario')

function agregarUsuario(req, res) {
    //Aqui va el codigo para agregar usuarios en la DB
};

function eliminarUsuario(req, res) {
    //Aqui va el codigo para  hacer eliminar usuarios en la DB
};

function modificarUsuario(req, res) {
    //Aqui va el codigo para modificar usuarios en la DB
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
    eliminarUsuario,
    modificarUsuario,
    iniciarSesion,
    cerrarSesion
}