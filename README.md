# <center>🎥 Proyecto Fresh Ratings 🎥</center>
Desarrollo de API con base en lo aprendido a lo largo de las sesiones correspondientes al módulo "Back-end Fundamentals", de la fase 2 del programa Desarrollo Web, impartido por la empresa BEDU en colaboración con Becas Santander.
##### Equipo 18

## 📜 Descripción del proyecto
El proyecto consiste en desarrollar una API para la manipulación y búsqueda de películas, así como su información. Los usuarios serán capaces de manipular la información almacenada en la base de datos y realizar operaciones `CRUD` (Create, Read, Update, Delete), correspondientes a las peticiones `GET`, `POST`, `PUT` y `DELETE`.

### 🎯 Requisitos:
Los requisitos mínimos que debe contar la API son los siguientes:
- Servicio para crear un registro
- Servicio para eliminar un registro
- Servicio para modificar un registro en específico
- Servicio para modificar más de un registro
- Servicio para consultar un registro por id
- Servicio para consultar todos los registros existentes
- Servicio para consultar por coincidencia de atributos
- Servicio para consultar todos los registros existentes (limitados a cierta cantidad)
- Servicio para consulta por campos específicos

### 👨‍💻 Herramientas utilizadas:
Para la elaboración de esta API se necesitaron varias herramientas, dependencias, librerías, etc., algunas de las más importantes son las siguientes:
- #### JavaScript / NodeJS
    `Node.js` es un entorno `JavaScript` que permite ejecutar en el servidor, de manera asíncrona, con una arquitectura orientada a eventos.  
    `JSON` es un formato basado en texto estándar para representar datos estructurados en la sintaxis de objetos de JavaScript.
- #### npm
    `npm` es el sistema de gestión de paquetes por defecto para Node.js que facilita la instalación y administración de paquetes. En este proyecto (entre otros), se utilizaron los siguientes:
    - `expresss`: Es un framework web que proporciona mecanismos para la escritura de manejadores de peticiones con diferentes verbos HTTP en diferentes caminos URL (rutas).
    - `nodemon`: Herramienta útil ya quevmonitorea los cambios en el código y automáticamente reinicia el servidor.
    - `cors`: Es un paquete que proporciona un middleware *Connect / Express* que se puede usar para habilitar CORS con varias opciones.
    - `body-parser`: Es un middleware de análisis que es responsable de analizar los cuerpos de las solicitudes entrantes en un middleware antes de manejarlo.
- #### MongoDB
    Para este proyecto se utilizó MongoDB, una base de datos de documentos que ofrece gran escalabilidad y flexibilidad, así como un modelo de consultas e indexación avanzado.  
    `Mongoose`
    Es una biblioteca de **ODM** para MongoDB y Node.js. Ayuda a manejar las relaciones entre los datos, cuenta con un esquema de validaciones y se usa para la traducción entre objetos en código y su representación en MongoDB.

### 🎬 Modelo
Para esta API planteamos dos modelos
- `Movie`
    Consiste en la entidad sobre la que se basa el funcionamiento de la API, en él se definen los atributos y las restricciones de cada campo, tal como se muestra a continuación:
    ```
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
    ```
- `User`
    Representa la entidad del usuario que va a realizar las consultas y que, a su vez puede registrarse se utilizó el schema siguiente:
    ```
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
    ```









### Equipo 18
- Jesus Omar Cervantes Gonzalez
- Sergio Alberto García Martínez
- Carlos Iván Ramírez Rendón

