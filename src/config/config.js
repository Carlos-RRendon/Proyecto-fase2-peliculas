const path = require('path');
const dotenv = require('dotenv').config();
 
  module.exports = {
      PORT : process.env.PORT || 3000,
      HOST : process.env.HOST || 'localhost',
      MONGODB_USER : process.env.MONGODB_USER,
      MONGODB_PASS: process.env.MONGODB_PASS,
     MONGODB_DATABASE : process.env.MONGODB_DATABASE,
     //secret: process.env.SECRET || 'secret'
  }