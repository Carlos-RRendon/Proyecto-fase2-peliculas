//Importando el modelo de user
const User = require('../models/User')

//CREATE
function addUser(req, res) {
    //Aqui va el codigo para agregar usuarios en la DB
    var user = new User(req.body)
    res.status(201).send(user)
};

//Read
function getUser(req, res) {
    // Simulando dos usuarios y respondiendolos
    var user1 = new User(1, 'Vicente', 'Guerrero', 55, 'vicente.g@gmail.com', '12345', 'admin', '25-feb-2021')
    res.send([user1])
  }

//UPDATE
function modifyUser(req, res) {
    //Aqui va el codigo para modificar usuarios en la DB
    // Simulación de un user previamente existente que el cliente modifica
    var user1 = new User(req.params.id, 'Vicente', 'Guerrero', 55, 'vicente.g@gmail.com', '123456', 'admin', '25-feb-2021')
    var modifications = req.body
    user1 = {
        ...user1,
        ...modifications
    }
    res.send(user1)
};

//DELETE
function deleteUser(req, res) {
    //Aqui va el codigo para  hacer eliminar usuarios en la DB
    //Simulación de una eliminación de un user, regresando un 200
    res.status(200).send(`User ${req.params.id} eliminado`);
};

function signIn(req, res) {
    //Aqui va el codigo para autenticar el inicio de sesion en la DB
};

function signOut(req, res) {
    //Aqui va el codigo para cerrar sesion
}


//Exportamos las funciones definidas
module.exports = {
    addUser,
    getUser,
    modifyUser,
    deleteUser,
    signIn,
    signOut
}