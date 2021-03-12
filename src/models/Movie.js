//Movie.js
//Clase que representa a una pelicula

/*
class Movie{
    constructor(id, titulo, genero, sinopsis, calificacion, clasificacion, duracion, director, actores, idiomaOriginal, fechaEstreno){
        this.id = id;
        this.titulo = titulo;
        this.genero = genero;
        this.sinopsis = sinopsis;
        this.calificacion = calificacion;
        this.clasificacion = clasificacion;
        this.duracion = duracion;
        this.director = director;
        this.idiomaOriginal = idiomaOriginal;
        this.actores = actores;
        this.fechaEstreno = fechaEstreno
    }
}
*/

//Importando mongoose
const mongoose = require('mongoose');
const {Schema, model} = mongoose;

//Importando módulo mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Movie = new Schema({

    movie :{
        _id : {
            type: Number, 
            index: true ,
            unique: true      
        },
        title: { 
            type: String,
             unique: true,
              required: [true,'Title cannot be empty'],
              index: true
        },
        image:{ type:String },
        genre: {
            type: [{type:String, required:true}],
            validate:{
            validator: function(v){ return v.length !== 0},
            msg: props => 'Must have at least one genre'
        }},
        synopsis: {
            type:String,
             required:[true,'Must have a synopsis']
            },
        classification: {
            type: String, required:[true,'Classification cannot be empty'],
             enum:[ 'G','PG','PG-13','NC-17', 'NR','R'],
             uppercase: true,
             match: [/[a-zA-Z]+\-*[0-9]*/si]
            },
        duration:{type:Number, required: [true,"Duration cannot be empty"]},
        director:{ type:String, required:[true, "A movie must have a director" ]},
        cast: {
            type:  [ {type: String} ],
            validate:{
                validator: function(v) {
                    console.log(v);
                    return v.length !==0
                },
                msg: v => "Must have at least one actor"
            }
        }
       ,
        originalLanguage: {type: String , default: 'Inglés'},
        releaseYear: {type: Date, required: [true, 'Must have a release year']}
    },
        
    score: {
        type: [{
        _id: false,
         user : {
             type: Schema.ObjectId,
             ref: 'User'
         },
         calification: {
             type: Number,
             required:true,
              min:0,
              max:10,
         }
    }]
    },    
},{timestamps:true});

Movie.plugin(AutoIncrement, {inc_field: 'movie._id' });

Movie.plugin(uniqueValidator);

module.exports = model('Movie', Movie, 'Movies');

