const path = require('path');




if ( process.env.NODE_ENV === 'development' ){
  const dotenv = require('dotenv');  
  dotenv.config ({
    path : path.resolve( __dirname, '..','..', process.env.NODE_ENV + '.env' )
  })  
} 

 
  module.exports = {
      PORT : process.env.PORT || 80,
      HOST : process.env.HOST || 'localhost',
      MONGODB_USER : process.env.MONGODB_USER,
      MONGODB_PASS: process.env.MONGODB_PASS,
      MONGODB_DATABASE : process.env.MONGODB_DATABASE,
     //secret: process.env.SECRET || 'secret',
     ENV : process.env.NODE_ENV
  }