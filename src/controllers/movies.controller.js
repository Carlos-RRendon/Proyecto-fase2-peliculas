//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');

const movieCtrl = {}

//CREATE
movieCtrl.addMovie = (req, res,next) => {
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
    movie.releaseYear = movie.releaseYear.toString()
    const newMovie = new Movie({movie,score});   
       
    newMovie.save()
    .then( movie => {
        res.status(201).send(`Movie added successfully ID:${movie._id} `)
    })
    .catch( next );

    /*
   //Function to validate without saving in DB
   newMovie.validate()
   .then( value => {res.send(`Movie added successfully: ${JSON.stringify(score)}`)} )
   .catch( e => res.send(next()));
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

movieCtrl.findByAttribs = async (req, res,next) =>{
    let params = req.query
    let key = Object.keys(params)[0]
    let attrib = `movie.${key}`;
    let value = new RegExp(params[key],'i');
    
    switch (key) {
        
        case '_id':
            value = params[key];
            break;
        
        case 'image':
            res.send('Cannot search by image');
            break;

        case 'synopsis':
            res.send('Searching by synopsis has no sense');
            break;

        case 'duration':
            value = params[key]
            break;

        case 'releaseYear':
            value = new Date(params[key])
            break;

        default:
            res.send('your search criteria does not match')
            break;
    };

      try{
      const movie = await Movie.find()
      .where(attrib)
      .equals(value)
      .exec()
      res.send(movie)
      } catch (e) { next }
    
    
};


//UPDATE
movieCtrl.modifyMovie = (req, res) =>{
    res.send("Funciono")
};


//DELETE
movieCtrl.deleteMovie = (req, res) =>{
    movieId = req.params.id
    Movie.findByIdAndDelete(movieId)
    .then( movie => {
        if (!movie) res.status(401).send('Movie Not found')
        else res.send(`Movie ID ${movie._id}: ${movie.movie.title} Successfully deleted`)
    })
    .catch(e => res.send(`Error ${e.message}`))
};


//Exportamos las funciones definidas
module.exports = movieCtrl