//User.js
//Clase que representa a un usuario
/*
class User{
    constructor(id, nombre, apellido, edad, correo, contraseña, tipo, fechaCreacion){
        this.id = id;
        this.nombre = nombre;
        this.contraseña = contraseña;
        this.apellido = apellido;
        this.edad = edad;
        this.correo = correo;
        this.tipo = tipo;
        this.fechaCreacion = fechaCreacion;
    }
}
module.exports = User
*/

const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator"); //Importando módulo mongoose-unique-validator, pendiente de instalar.
const crypto = require('crypto'); //Importando módulo crypto, pendiente de instalar.
const jwt = require('jsonwebtoken'); //Importando módulo jsonwebtoken, pendiente de instalar.
const secret = require('../config').secret;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "It could not be empty"],
        match: [/^[a-zA-Z0-9]+$/, "Invalid data"],
        index: true,
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, "It could not be empty"],
        match: [/\S+@\S+\.\S+/, "Invalid data"],
        index: true,
    },
    age: {
        type: Number,
    },
    type: {
        type: String,
        enum: ['admin', 'client'],
        index: true,
    },
    hash: String, //este campo se utilizará para la sesión
    salt: String, //este campo se utilizará para la sesión
}, {
    timestamps: true
});


// usando plugin de validación para que no se repitan correos ni usernames
UserSchema.plugin(uniqueValidator, {
    message: "It already exists"
});

//Crea constraseña para los usuarios
UserSchema.methods.createPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString("hex"); // generando una "sal" random para cada usuario
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex"); // generando un hash utilizando la sal
};

//Comparar si el hash es el mismo a la almacenada en la BD
UserSchema.methods.validarPassword = function (password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    return this.hash === hash;
};

//Generar Token de autentificación de 60 días de expiración
UserSchema.methods.generateJWT = function () {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60); // 60 días antes de expirar

    return jwt.sign({
        id: this._id,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000),
    }, secret);
};

/**
 * Devuelve la representación de un usuario después de autenticar
 */
UserSchema.methods.toAuthJSON = function () {
    return {
        username: this.username,
        email: this.email,
        token: this.generarJWT()
    };
};

/**
 * Devuelve la representación de un usuario, sólo datos públicos
 */
UserSchema.methods.publicData = function () {
    return {
        id: this.id,
        username: this.username,
        name: this.nombre,
        lastName: this.apellido,
        email: this.email,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
    };
};


//Define el modelo Usuario, utilizando el esquema UsuarioSchema.
mongoose.model("User", UserSchema);