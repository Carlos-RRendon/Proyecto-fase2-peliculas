
create database freshRatings;


use freshRatings;


CREATE TABLE clasificacion(
idClasificacion INT(2) NOT NULL AUTO_INCREMENT,
clasificacion VARCHAR(5) NOT NULL,
descripcion VARCHAR(100) NOT NULL,
PRIMARY KEY(idClasificacion)
);

describe clasificacion;


CREATE TABLE tipo(
idTipo INT(2) NOT NULL AUTO_INCREMENT,
tipo VARCHAR(20) NOT NULL,
PRIMARY KEY(idTipo)
);

describe tipo;


CREATE TABLE genero(
idGenero INT(2) NOT NULL AUTO_INCREMENT,
genero VARCHAR(20) NOT NULL,
PRIMARY KEY(idGenero)
);

describe genero;

CREATE TABLE usuario(
idUsuario INT(4) AUTO_INCREMENT,
nombre VARCHAR(100) NOT NULL,
apellido VARCHAR(100) NOT NULL,
edad INT(2),
correo VARCHAR(100) NOT NULL UNIQUE,
contraseña VARCHAR(100) NOT NULL,
idTipo INT(2),
fechaCreacion DATE NOT NULL,
PRIMARY KEY(idUsuario),
FOREIGN KEY(idTipo) REFERENCES tipo(idTipo)
);

describe usuario;


CREATE TABLE pelicula(
idPelicula INT(8) AUTO_INCREMENT,
titulo VARCHAR(100) NOT NULL,
imagen VARCHAR(50) NOT NULL,
idGenero INT(2) NOT NULL,
sinopsis VARCHAR(500) NOT NULL,
idClasificacion INT(2) NOT NULL,
duracion VARCHAR(10) NOT NULL,
director VARCHAR(80) NOT NULL,
actores VARCHAR(150) NOT NULL,
idiomaOriginal VARCHAR(20) NOT NULL,
anioPublicacion INT(4) NOT NULL,
idCalificacion INT(2) NOT NULL,
PRIMARY KEY(idPelicula),
FOREIGN KEY(idGenero) REFERENCES genero(idGenero),
FOREIGN KEY(idClasificacion) REFERENCES clasificacion(idClasificacion)
);

describe pelicula;


CREATE TABLE calificacion(
idCalificacion INT(10) AUTO_INCREMENT,
idUsuario INT(4) NOT NULL,
idPelicula INT(8) NOT NULL,
calificacion INT(2) NOT NULL,
PRIMARY KEY(idCalificacion),
FOREIGN KEY(idUsuario) REFERENCES usuario(idUsuario)
);
describe calificacion;

CREATE TABLE pelicula_has_calificacion(
    idCalificacion INT(10),
    idPelicula INT(8),
    FOREIGN KEY(idCalificacion) REFERENCES calificacion(idCalificacion),
    FOREIGN KEY(idPelicula) REFERENCES pelicula(idPelicula)
);
describe pelicula_has_calificacion;

