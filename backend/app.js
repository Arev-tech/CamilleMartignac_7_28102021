// Imports
const express = require('express');
const bodyParser = require('body-parser');
const usersRoutes    = require('./routes/usersRoutes');
const path = require('path');

// Sécurité API
const cors = require('cors');
const dotenv = require("dotenv");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
// app.use sécurité
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('combined'));



const messagesRoutes = require('./routes/messagesRoutes');
const commentairesRoutes = require('./routes/commentairesRoutes');

// Test DB
const { sequelize } = require('./models/index');
const { concatSeries } = require('async');
const dbTest = async function () {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};
dbTest();
// Fin test DB



//déclaration de la limite d'essai d'authentification
const limiteur  =  rateLimit ( { 
  windowMs : 5  *  60  *  1000 ,  // 5 minutes 
  max : 10  // limite chaque IP à 10 requêtes par windowMs 
} ) ;

// s'applique à toutes les demandes authentification
app.use("/api/users", limiteur) ;
app.use('/images', express.static(path.join(__dirname, 'images')))
//Images
app.use('/api/users', usersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/messages/me', commentairesRoutes);

module.exports = app;