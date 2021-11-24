// Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const usersRoutes    = require('./routes/usersRoutes');
const messagesRoutes = require('./routes/messagesRoutes');
const commentairesRoutes = require('./routes/commentairesRoutes');
const dotenv = require("dotenv");
dotenv.config();


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

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'images')))
//Images
app.use('/api/users', usersRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/messages/me', commentairesRoutes);

module.exports = app;