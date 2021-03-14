//Importando el modelo de user
const User = require('../models/User')

const userCtrl ={}

//CREATE
userCtrl.addUser = async (req, res) => {
    
    const body = req.body;
    const user = new User(body);
    user.password = await user.encryptPassword(body.password);
    user.save()
    .then( succes => res.send(`User ${body.username} successfully added`))
    .catch(e => {res.send(e.message)})
};

//Read
userCtrl.getUser = (req, res) => {
    // Simulando dos usuarios y respondiendolos
    var user1 = new User(1, 'Vicente', 'Guerrero', 55, 'vicente.g@gmail.com', '12345', 'admin', '25-feb-2021')
    res.send([user1])
  }

//UPDATE
userCtrl.modifyUser =(req, res) => {
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
userCtrl.deleteUser= (req, res) => {
    //Aqui va el codigo para  hacer eliminar usuarios en la DB
    //Simulación de una eliminación de un user, regresando un 200
    res.status(200).send(`User ${req.params.id} eliminado`);
};

userCtrl.signIn =(req, res) => {
    //Aqui va el codigo para autenticar el inicio de sesion en la DB
};

userCtrl.signOut= (req, res) => {
    //Aqui va el codigo para cerrar sesion
}


//Exportamos las funciones definidas
module.exports = userCtrl;