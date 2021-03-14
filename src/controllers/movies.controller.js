//Importando el modelo de movie
const Movie = require('../models/Movie');
const User = require('../models/User');

const movieCtrl = {}

//CREATE
movieCtrl.addMovie = (req, res) => {
    //Aqui va el codigo para agregar peliculas en la DB

    const {
        movie,
        score
    } = req.body;

    const checkDuplicates = () => {
        scoreArray = [];
        score.forEach(element => {
            if (scoreArray.includes(element.user))
                throw new Error('User can only rate once')
            else scoreArray.push(element.user)
        })
    }

    try {
        checkDuplicates();
    } catch (e) {
        res.send(e.message)
    }

    const newMovie = new Movie({
        movie,
        score
    });

    newMovie.save()
        .then(movie => {
            res.status(201).send('Movie added successfully')
        })
        .catch(e => {
            res.status(400).send(e.message)
        });

    /*
   //Function to validate without saving in DB
   newMovie.validate()
   .then( value => {res.send(`Movie added successfully: ${JSON.stringify(score)}`)} )
   .catch( e => res.send(e.message));
   */

};

//READ
movieCtrl.getMovies = async (req, res, next) => {
    //console.log(req.params.id)

    if (req.params.id) {
        Movie.findById(req.params.id)
            .then(result => res.send(result))
            .catch(e => res.send('Not found'))
    } else {
        const movies = await Movie.find({})
        res.send({
            movies
        })
    }
};

//UPDATE
movieCtrl.updateByAtribute = async (req, res, next) => {
    let atribute = req.query
    let key = Object.keys(atribute)[0]

    Movie.findById(req.params.id).then(movie => {
        /*
        let newData = req.body
        let valuesData = Object.values(newData)
        let keysMovie = Object.keys(movie.movie)

        if (!movie) {
            return res.sendStatus(401);
        } else {
            keysMovie.forEach(element => {
                if (element == key) {
                    console.log(element)
                    console.log(valuesData[0])
                    /*if (typeof valuesData[0] !== 'undefined')
                        movie.movie.valuesData[0] = valuesData[1]
                        //console.log(newData.key)
                    movie.save().then(updAtribute => {
                        res.status(201).json(updAtribute)
                    }).catch(next)
                }
            });
        }
        */

        //ESto ya sale
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
/* **************************************************************************************************** */
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

movieCtrl.findByAttribs = (req, res) => {
    res.send('Hola')
    //let params = req.query
    //let key = Object.keys(params)[1]
    //res.send(params)
};

/*
//UPDATE
movieCtrl.modifyMovie = (req, res) => {
    res.send("Funciono")
};

//DELETE
movieCtrl.deleteMovie = (req, res) => {
    res.send("Funciono")
};

movieCtrl.addScore = (req, res) => {
    res.send("Funciono")
}*/

//Exportamos las funciones definidas
module.exports = movieCtrl