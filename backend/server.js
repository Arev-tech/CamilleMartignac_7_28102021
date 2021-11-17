// Imports
const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./apiRouter').router;
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const cors = require('cors');

// Instanciate server
const server = express();

// Configuration de limite pour les connexions
const  limiteur  =  rateLimit ({ 
    windowMs : 5  *  60  *  1000 ,  // 5 minutes 
    max : 10  // limite chaque IP à 10 requêtes par windowMs 
  });

//Body parser configuration
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(cors());

// Configure routes
server.get('/', function (req, res) {
    res.setHeader('Content-Type','text/html');
    res.status(200).send('<h1>Bonjour sur mon serveur</h1>');
});

// Utilisation du package helmet pour toutes les routes
server.use(helmet());
server.use('/api/', apiRouter);

// Sécurisation contre les essais multiples de connexions
server.use('/api/auth', limiteur);
server.use('/files', express.static(path.join(__dirname, '/files')));
// Launch server
server.listen(3000, function() {
    console.log('Server listen on port 3000');
});