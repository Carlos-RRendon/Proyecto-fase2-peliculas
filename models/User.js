//User.js
//Clase que representa a un usuario

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