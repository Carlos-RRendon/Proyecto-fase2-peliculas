//User.js
//Clase que representa a un usuario

//Importando mongoose
 const {Schema, model} = require('mongoose');

 //Importando módulo mongoose-unique-validator
 const uniqueValidator = require('mongoose-unique-validator');
 const bcrypt = require('bcryptjs');

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

User.plugin(uniqueValidator);

User.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash( password, salt)
}
 
module.exports = model('User', User, 'Users');