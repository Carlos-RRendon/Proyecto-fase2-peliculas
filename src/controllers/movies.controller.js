//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');

const movieCtrl = {}

//CREATE
movieCtrl.addMovie = (req, res,next) => {
    //Aqui va el codigo para agregar peliculas en la DB
   
   const {movie} = req.body;

    movie.releaseYear = movie.releaseYear.toString()
    const newMovie = new Movie({movie});   
       
    newMovie.save()
    .then( movie => {
        res.status(201).send(`Movie added successfully ID:${movie._id} `)
    })
    .catch( next );
     
};

//READ
movieCtrl.getMovies = async (req, res,next) =>{

    if(req.params.id){
            Movie.findById(req.params.id)
            .then( result => res.send (result))
            .catch(e => res.send('Not found')) 
    } else{
        if (req.query){
            const limit= parseInt(Object.values(req.query)[0])
            try{
                const movies = await Movie.find()
                .limit(limit)
                .exec()
                res.send(movies)
            } catch (e) {next}
            
        }else{
        const movies = await Movie.find({})
        res.send({movies})
        }

    } 
};


movieCtrl.findAndFilter =async (req,res,next) => {

    let params = req.query;
    let key = Object.keys(params)[0];
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
            if ( !['genre','title','director','cast','originalLanguage','classification'].includes(key)) res.send('your search criteria does not match')
            break;
    };

        
     let filters = {};
     let enableId = {};
    
     if ( Object.keys(req.body).length !==0 ){
         filters= req.body;
         enableId = { _id :  filters._id};
         Object.keys(filters)
         .forEach( element => {
             if (!["movie.genre","movie._id","movie.title","movie.image","movie.synopsis","movie.duration","movie.director","movie.cast","movie.releaseYear","_id","originalLanguage"].includes(element))
             delete filters[element];
             if (filters[element] !== 1 )
             delete filters[element];
         });
     }

    
    
    try{
        const movie = await Movie.find()
        .where(attrib)
        .equals(value)
        .select(filters)
        .select(enableId)
        .exec()
        if (movie.length === 0 ) res.send("Sorry we couldn't find anything for your search, please try again");
        else res.send(movie);
        } catch (e) { next }
};


//UPDATE
movieCtrl.totalUpdate = async (req,res,next) => {

    const id = req.params.id;
 
    if (Object.keys(req.body).length !== 0  ){
            
        let { genre,  title, image, synopsis, duration, director, cast, releaseYear,classification } = req.body;
        
        //Validations to mantain coherense in DB
        const validateInput = () =>{
            if(genre === undefined || genre.length === 0 )  throw new Error (`Must have at least one genre in field: genre, value ${genre}`);
            else 
                if( typeof(genre) === "string" ) genre = new Array(genre);
            if (cast === undefined || cast.length === 0 ) throw new Error (`Must have at least one actor in field: cast, value ${cast}`)
            else
                if (typeof (cast) === 'string') cast = new Array(cast);    
            
            if (typeof releaseYear === 'number') releaseYear =releaseYear.toString();
            if( classification === undefined || ![ 'G','PG','PG-13','NC-17', 'NR','R'].includes(classification)) throw new Error (`Error on classification field, must be one of this values ['G','PG','PG-13','NC-17', 'NR','R'], obtained ${classification}`)
        }

        try{
            validateInput();
            const movie = await Movie.findByIdAndUpdate( id , { 'movie.genre':genre,'movie.title': title, 'movie.image':image, 'movie.synopsis':synopsis, "movie.duration":duration, "movie.director":director, "movie.cast":cast, "movie.releaseYear" :releaseYear, "movie.cast":cast, "movie.classification":classification }, {new:true, runValidators:true, context:'query'});
            res.send(movie)
        } catch (e){ res.status(400).send(e.message);}
    } else{ res.status(400).send('There are no parameters to update') }
    
   
}

movieCtrl.partialUpdate =  async (req,res,next) => {
    const id = req.params.id; 
    const body = req.body;
    let key = Object.keys(body)[0];
    let value = body[key];
    var query = {};
    
    switch (key) {
        case 'genre':
            
            if ( value.length === 0 ){
                res.status(400).send('Must have at least one genre');
                return
            }
            else {
                if ( typeof(value) === 'string' ) value = new Array(value);
                if ( typeof(value) === 'number' ){
                    res.status(400).send('Genre cannot be a number');
                    return
                }
            } 
            query = {"movie.genre": value}           
            break;

        case 'cast':
            key = 'movie.cast';
            if ( value.length === 0  ){
                res.status(400).send('Must have at least one actor');
                return    
            }
            else {
                if ( typeof(value) === 'string' ) value = new Array(value);
                if ( typeof(value) === 'number' ) {
                    res.status(400).send('Cast cannot be a number');
                     return
                }
            }  
            query = {"movie.cast":value}    
            break;

        case 'title':
            query = {"movie.title":value}
            break;

        case 'originalLanguage':
            query = {"movie.originalLanguage":value}
            break;

            case 'image':
                query = {"movie.image": value}
            break;

        case 'synopsis':
            query = {"movie.synopsis": value}
            break;

        case 'classification':
          
            if( ![ 'G','PG','PG-13','NC-17', 'NR','R'].includes(value)){
                res.status(400).send(`Classification must be one of this values ['G','PG','PG-13','NC-17', 'NR','R'], obtained ${value}`);
                return
            }
            query = {"movie.classification": value}
            break;

        case 'duration':
            if ( typeof value !== "number") {res.status(401).send('Duration must be a number');return}
            query = {"movie.duration": value}
            break;

        case 'director':
            query = {"movie.director": value}
            break;

        case 'releaseYear':
            key = 'movie.releaseYear'
            if (typeof(value) === 'number') {
                value = value.toString();
                query = {"movie.releaseYear": value}
            } else {res.status(400).send('releaseYear must be a number'); return}
            
    
            
        default:
            res.status(400).send(`The property ${key} doesn't exist`);
            return
           
    }
    

     try{
         const movie = await Movie.findByIdAndUpdate( id ,query, {new:true, runValidators:true, context:'query'});
         res.send(movie)
     } catch (e){ res.status(400).send(e.message);}



}


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