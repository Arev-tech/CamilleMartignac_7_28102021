// Imports

const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

// Constants
const COMMENTAIRE_LIMIT = 100;


// Routes
module.exports = {
    createCommentaire: function(req, res) {
        // Authorization
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        // Params
        const messageId = req.headers.messageid;
        const commentaire = req.headers.commentaire;
        console.log(req.headers);

        if(userId == null || messageId == null || commentaire == null) {
            return res.status(400).json({ 'error': 'missing parameters' });
        }
        if(commentaire.length > 200) {
            return res.status(400).json({ 'error': 'commentaire max length = 200' });
        }
        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id','username'],
                    where: {
                        id: userId
                    }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    return res.status(400).json({ 'error': 'cannot verify user'});
                });
            },
            function(userFound, done) {
                if(userFound) {
                    models.Message.findOne({
                        where: {
                            id: messageId
                        }
                    })
                    .then(function(messageFound) {
                        done(null, messageFound);
                    })
                    .catch(function(err) {
                        return res.status(400).json({ 'error': 'cannot verify message'});
                    });
                }
            },
            function(userFound, messageFound, done) {
                if(messageFound && userFound) {
                    models.Commentaire.create({
                        MessageId: messageId,
                        UserId: userId,
                        Username: userFound.username,
                        Commentaire: commentaire
                    })
                    .then(function(newCommentaire) {
                        return res.status(201).json({ newCommentaire });
                    })
                    .catch(function(err) {
                        return res.status(400).json({ err });
                    });
                } else {
                    return res.status(500).json({ 'error': 'message cannot be found' });
                }
            },
        ], function(newCommentaire) {
            if(newCommentaire) {
                return res.status(201).json({ newCommentaire });
            } else {
                return res.status(500).json({ 'error': 'cannot add commentaire' });
            }
        });
    },
    deleteCommentaires: function(req,res) {
        //Authorization
        const headerAuth = req.headers['Authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //Params
        const commentaireId = req.headers.id;
        console.log('USER' + userId);
        console.log('COM ID' + commentaireId);

        models.Commentaire.destroy({
            where: { 
                id: commentaireId
            }
        })
        .then(function(){
            res.status(200).json({ 'message': 'commentaire deleted' });
        })
        .catch (function(err) {
            res.status(500).json({ 'error': 'commentaire cannot be found'});
        })
    },
    getAllCommentaires: function(req, res) {
        const fields  = req.query.fields;
        const limit   = parseInt(req.query.limit);
        const offset  = parseInt(req.query.offset);
        const order   = req.query.order;
        const messageId = req.headers.id;

        if(limit > COMMENTAIRE_LIMIT) {
            limit = COMMENTAIRE_LIMIT;
        }

        models.Commentaire.findAll({
            order: [(order != null) ? order.split(':') : ['id', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username','id' ]
            },
            {
                model: models.Message,
                attributes: [ 'id']
            }],
            where: { 
                MessageId: messageId
            }
        })
        .then(function(commentaires) {
            if (commentaires) {
                res.status(200).json(commentaires);
            } else {
                res.status(404).json({ "error": "no messages found" });
            }
        })
        .catch(function(err) {
            console.log(err);
            res.status(500).json({ err });

        });
    }
}