//Movie.js
//Clase que representa a una pelicula

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
            validator: v => { return v.length !== 0},
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
                validator: v => {
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
            user: {
                type: Schema.ObjectId,
                ref : 'User'
            },
            rating: {
                type: Number,
                required: true,
                min : 0,
                max : 10
            },
            _id: false
        }]
    }    
},{timestamps:true});




Movie.plugin(AutoIncrement, {inc_field: 'movie._id' });

Movie.plugin(uniqueValidator);

module.exports = model('Movie', Movie, 'Movies');

