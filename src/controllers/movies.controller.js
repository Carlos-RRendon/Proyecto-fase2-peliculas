//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');

const movieCtrl = {}

//CREATE
movieCtrl.addMovie = (req, res,next) => {
    //Aqui va el codigo para agregar peliculas en la DB
   
   if( Object.keys(req.body).length !==0 ) {
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
    }
    else { next() }

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
            if (!["movie.genre","movie._id","movie.title","movie.image","movie.synopsis","movie.duration","movie.director","movie.cast","movie.releaseYear","_id"].includes(element))
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
movieCtrl.updateByAtribute = async (req, res, next) => {
    let atribute = req.query
    let key = Object.keys(atribute)[0]
    console.log(req.params.id,req.body)

    Movie.findById(req.params.id).then(movie => {
        
        if (!movie) {
            return res.sendStatus(401);
        }
        let newData = req.body

        switch (key) {
            case 'title':
                if (typeof newData.title !== 'undefined')
                    movie.movie.title = newData.title
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'image':
                if (typeof newData.image !== 'undefined')
                    movie.movie.image = newData.image
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'genre':
                if (typeof newData.genre !== 'undefined')
                    movie.movie.genre = newData.genre
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'synopsis':
                if (typeof newData.synopsis !== 'undefined')
                    movie.movie.synopsis = newData.synopsis
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'classification':
                if (typeof newData.classification !== 'undefined')
                    movie.movie.classification = newData.classification
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'duration':
                if (typeof newData.duration !== 'undefined')
                    movie.movie.duration = newData.duration
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'director':
                if (typeof newData.director !== 'undefined')
                    movie.movie.director = newData.director
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'originalLanguage':
                if (typeof newData.originalLanguage !== 'undefined')
                    movie.movie.originalLanguage = newData.originalLanguage
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            case 'releaseYear':
                if (typeof newData.releaseYear !== 'undefined')
                    movie.movie.releaseYear = newData.releaseYear
                movie.save().then(updAtribute => {
                    res.status(201).json(updAtribute)
                }).catch(next)
                break;
            default:
                res.send('Unable to update your DB')
                break;
        };
    }).catch(next)
}

movieCtrl.updateMovie = async (req, res, next) => {
    //let newData = req.body
    //res.send(newData)
    Movie.findById(req.params.id).then(movie => {
        if (!movie) {
            return res.sendStatus(401);
        }
        let newData = req.body
        if (typeof newData.title !== 'undefined')
            movie.movie.title = newData.title
        if (typeof newData.image !== 'undefined')
            movie.movie.image = newData.image
        if (typeof newData.genre !== 'undefined') {
            for (let i = 0; i < newData.genre.length; i++) {
                let cont = 0
                for (let j = 0; j < movie.movie.genre.length; j++) {
                    if (newData.genre[i] != movie.movie.genre[j]) {
                        cont++
                    }
                    if (cont == movie.movie.genre.length)
                        movie.movie.genre.push(newData.genre[i])
                }
            }
        }
        if (typeof newData.synopsis !== 'undefined')
            movie.movie.synopsis = newData.synopsis
        if (typeof newData.classification !== 'undefined')
            movie.movie.classification = newData.classification
        if (typeof newData.duration !== 'undefined')
            movie.movie.duration = newData.duration
        if (typeof newData.director !== 'undefined')
            movie.director = newData.director
        if (typeof newData.cast !== 'undefined') {
            for (let i = 0; i < newData.cast.length; i++) {
                let cont = 0
                for (let j = 0; j < movie.movie.cast.length; j++) {
                    if (newData.cast[i] != movie.movie.cast[j]) {
                        cont++
                    }
                    if (cont == movie.movie.cast.length)
                        movie.movie.cast.push(newData.cast[i])
                }
            }
        }
        if (typeof newData.originalLanguage !== 'undefined')
            movie.movie.originalLanguage = newData.originalLanguage
        if (typeof newData.releaseYear !== 'undefined')
            movie.movie.releaseYear = newData.releaseYear
        movie.save().then(updatedMovie => {
            res.status(201).json(updatedMovie)
        }).catch(next)
    }).catch(next)
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