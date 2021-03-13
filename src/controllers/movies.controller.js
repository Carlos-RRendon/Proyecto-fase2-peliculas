//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');

const movieCtrl = {}

//CREATE
movieCtrl.addMovie = (req, res) => {
    //Aqui va el codigo para agregar peliculas en la DB
   
   const {movie, score} = req.body;

   const checkDuplicates = () => {
       scoreArray = [];
       score.forEach(element => {
           if (scoreArray.includes(element.user))
            throw new Error('User can only rate once')
           else scoreArray.push(element.user)
       })
   }

   try{
       checkDuplicates();
    }catch (e){
        res.send(e.message)
    }   
    
    const newMovie = new Movie({movie,score});   
       
    newMovie.save()
    .then( movie => {res.status(201).send('Movie added successfully')})
    .catch( e => {res.status(400).send(e.message)} );

    /*
   //Function to validate without saving in DB
   newMovie.validate()
   .then( value => {res.send(`Movie added successfully: ${JSON.stringify(score)}`)} )
   .catch( e => res.send(e.message));
   */
     
};

//READ
movieCtrl.getMovies = async (req, res,next) =>{

    if(req.params.id){
            Movie.findById(req.params.id)
            .then( result => res.send (result))
            .catch(e => res.send('Not found')) 
    } else{
        const movies = await Movie.find({})
        res.send({movies})
    } 
};

movieCtrl.findByAttribs = (req, res) =>{
    res.send('Hola')
};


//UPDATE
movieCtrl.modifyMovie = (req, res) =>{
    res.send("Funciono")
};

//DELETE
movieCtrl.deleteMovie = (req, res) =>{
    res.send("Funciono")
};

movieCtrl.addScore = (req, res) =>{
    res.send("Funciono")
}

//Exportamos las funciones definidas
module.exports = movieCtrl