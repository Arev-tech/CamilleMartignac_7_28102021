// Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');
const fs = require('fs');

const ITEMS_LIMIT   = 50;

// Routes
module.exports = {
    getAllMessages: function(req, res) {
        var fields  = req.query.fields;
        var limit   = parseInt(req.query.limit);
        var offset  = parseInt(req.query.offset);
        var order   = req.query.order;

        if (limit > ITEMS_LIMIT) {
        limit = ITEMS_LIMIT;
        }

        models.Message.findAll({
            order: [(order != null) ? order.split(':') : ['id', 'DESC']],
            attributes: (fields !== '*' && fields != null) ? fields.split(',') : null,
            limit: (!isNaN(limit)) ? limit : null,
            offset: (!isNaN(offset)) ? offset : null,
            include: [{
                model: models.User,
                attributes: [ 'username', 'id' ]
            },
            {
                model: models.Commentaire,
                attributes: [ 'commentaire', 'username' ]
            }]
        }).then(function(messages) {
            if (messages) {
                res.status(200).json({messages});
            } else {
                res.status(404).json({ "error": "no commentaire found" });
            }
        }).catch(function(err) {
            console.log(err);
            res.status(500).json({ 'error' : 'fields invalid' });
        });
    },
    getOneMessage: function(req, res) {
        // Params
        const messageId = req.headers.id;
        models.Message.findOne({
            attributes: ['title', 'content', 'attachment', 'createdAt'],
            where: { id: messageId },
            include: [{
                model: models.User,
                attributes: [ 'username', 'id' ]
            },
            {
                model: models.Commentaire,
                attributes: [ 'commentaire', 'username' ]
            }]
                
        })
        .then(function(messageFound, req) {
            if(messageFound) {
                res.status(201).json(messageFound);
            } else {
                res.status(404).json(req.body);
            }
        })
        .catch(function(err) {
            return res.status(500).json(err);
        });
    },
    updateMessage : function(req,res) {
        // Authorization
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        const title = req.body.title;
        const content = req.body.content;
        const messageId = req.body.id;
        let imageUrl = '';

        models.Message.findOne({
            attributes : ['title', 'content', 'id', 'attachment'],
            where : { id: messageId }
        })
        .then(function(messageFound) {
            if(messageFound) {
                if(userId == messageFound.userId) {
                    if (req.file) {
                        ampleFile = req.files.sampleFile;
                        ima = __dirname + '/image/' + sampleFile.name;
                        if (messageFound.attachment) {
                            const filename = messageFound.attachment.split("/files")[1];
                            fs.unlink(`files/${filename}`, (err) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(`Deleted file: files/${filename}`);
                            }
                            })
                        }
                    }
                    messageFound.update({
                        title : (title ? title: messageFound.title),
                        content: (content ? content: messageFound.content)
                    })
                    .then(function(messageFound) {
                        return res.status(201).json({ messageFound });
                    })
                    .catch(function(err) {
                        return res.status(500).json({ 'error' : 'cannot update message' });
                    });
                }
            }
            else {
                return res.status(404).json({ 'error' : 'cannot update message' });
            }
        })
        .catch(function(err) {
            return res.status(404).json({ 'error' : 'cannot find message' });
        });
    },
    createMessage: function(req, res) {
        // Authorization
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        const title = req.body.title;
        const content = req.body.content;
        let imageUrl = `${req.protocol}://${req.get("host")}/images/${ req.file.filename}`;
        if (title == null || content == null || req.file == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            });
        }
        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                    attributes: ['id', 'username'],
                    where: {
                        id: userId
                    }
                })
                .then(function(userFound) {
                    done(null, userFound);
                })
                .catch(function(err) {
                    console.log(err);
                    return res.status(500).json({
                        err
                    });
                });
            },
            function(userFound, done) {
                if (userFound) {
                    models.Message.create({
                            title: title,
                            content: content,
                            UserId: userFound.id,
                            username: userFound.username,
                            attachment: imageUrl,
                        })
                        .then(function(newMessage) {
                            done(newMessage);
                        })
                        .catch(function(err) {
                            res.status(400).json({ err });
                        });
                } else {
                    return res.status(500).json({
                        'error' : 'user cannot be found'
                    });
                }
            },
        ], function(newMessage) {
            if (newMessage) {
                return res.status(201).json({
                    newMessage
                });
            } else {
                return res.status(500).json({
                    'error': 'cannot add message'
                });
            }
        });
    },
    deleteMessage: function(req, res) {
         // Getting auth header
        var headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);


        const messageId = req.headers.messageid;
        console.log(req.headers);
        models.Commentaire.destroy({
            where: { 
                messageId : messageId 
            }
        })
        .then(function() {
            models.Message.destroy({
                where : {
                    id : messageId
                }
            })
            .then(function() {
                res.status(200).json({ 'message' : 'message supprimé'});
            })
            .catch(function(err) {
                res.status(400).json(err);
            })
        })
        .catch(function(err) {
            res.status(400).json(err);
        });
    }

}