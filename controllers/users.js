/*
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
*/

const mongoose = require("mongoose")
const User = mongoose.model("User")
const passport = require('passport');

function createUser(req, res, next) {
    const body = req.body,
        password = body.password

    delete body.password
    const user = new User(body)
    user.crearPassword(password)
    user.save().then(createdUser => {
        return res.status(201).json(createdUser.toAuthJSON())
    }).catch(next)
}

function updateUser(req, res, next) {
    console.log(req.user)
    User.findById(req.user.id).then(user => {
        if (!user) {
            return res.sendStatus(401);
        }
        let newInfo = req.body
        if (typeof newInfo.username !== 'undefined')
            user.username = newInfo.username
        if (typeof newInfo.name !== 'undefined')
            user.name = newInfo.name
        if (typeof newInfo.lastName !== 'undefined')
            user.lastName = newInfo.lastName
        if (typeof newInfo.email !== 'undefined')
            user.email = newInfo.email
        if (typeof newInfo.age !== 'undefined')
            user.age = newInfo.age
        if (typeof newInfo.password !== 'undefined')
            user.createPassword(newInfo.password)
        user.save().then(updatedUser => {
            res.status(201).json(updatedUser.publicData())
        }).catch(next)
    }).catch(next)
}

function deleteUser(req, res) {
    User.findOneAndDelete({
        _id: req.user.id
    }).then(r => {
        res.status(200).send(`User ${req.params.id} deleted successfully: ${r}`);
    })
}

function logIn(req, res, next) {
    if (!req.body.email) {
        return res.status(422).json({
            errors: {
                email: "This field is required"
            }
        });
    }

    if (!req.body.password) {
        return res.status(422).json({
            errors: {
                password: "This field is required"
            }
        });
    }

    passport.authenticate('local', {
        session: false
    }, function (err, user, info) {
        if (err) {
            return next(err);
        }

        if (user) {
            user.token = user.generateJWT();
            return res.json({
                user: user.toAuthJSON()
            });
        } else {
            return res.status(422).json(info);
        }
    })(req, res, next);
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    logIn
}