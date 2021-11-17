// Imports
const express      = require('express');
const multer = require('multer');
const usersCtrl    = require('./routes/usersCtrl');
const messagesCtrl = require('./routes/messagesCtrl');
const commentairesCtrl = require('./routes/commentairesCtrl');
const auth = require('./middleware/auth');
const dotenv = require('dotenv');
dotenv.config();


// Router
exports.router = (function() {
  var apiRouter = express.Router();

  // Users routes
  apiRouter.route('/users/register/').post(usersCtrl.register);
  apiRouter.route('/users/login/').post(usersCtrl.login);
  apiRouter.route('/users/me/').get(usersCtrl.getUserProfile);
  apiRouter.route('/users/me/').put(auth, usersCtrl.updateUserProfile);
  apiRouter.route('/users/me/').delete(auth, usersCtrl.deleteProfile);

  // Messages routes
  apiRouter.route('/messages/new/').post(auth, messagesCtrl.createMessage);
  apiRouter.route('/messages/').get(auth, messagesCtrl.getAllMessages);
  apiRouter.route('/messages/me/').get(messagesCtrl.getOneMessage);
  apiRouter.route('/messages/me/').put(auth, multer, messagesCtrl.updateMessage);

  // Commentaires routes
  apiRouter.route('/messages/me/commentaires/').post(auth, commentairesCtrl.createCommentaire);
  apiRouter.route('/messages/me/commentaires/').get(auth, commentairesCtrl.getAllCommentaires);
  return apiRouter;
})();