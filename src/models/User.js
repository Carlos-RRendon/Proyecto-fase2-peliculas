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
*/

//Importando mongoose
 const {Schema, model} = require('mongoose');

 //Importando módulo mongoose-unique-validator
 const uniqueValidator = require('mongoose-unique-validator');

const User = new Schema({

    username: {
        type : String,
        unique: true,
        required: [true, "User cannot be empty"],
        match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/si, 'Invalid User'],
        index: true,
        minlength : 4,
        maxlength: 20
    },
    name: { type : String, required : true},
    lastName : {type: String, required : true},
    age: {type: Number, min:1, max:100, required:true},
    email : {
        type: String,
        unique : true,
        required: [true, "Email cannot be empty"],
        match : [/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/si,'Invalid email'],
        index: true
    },
    password :{ type:String, required: true },
    type:{ 
        type: String,
        lowercase: true,
        enum: ['admin','user'], 
        default: 'user'
    }
},{timestamps:true});

User.plugin(uniqueValidator)
 
module.exports = model('User', User, 'Users');