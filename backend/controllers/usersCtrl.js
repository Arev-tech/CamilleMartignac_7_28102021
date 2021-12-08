// Imports
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');
const models = require('../models');
const asyncLib = require('async');

// Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^(?=.*\d).{4,12}$/;

// Routes
module.exports = {
    register: function(req, res) {

        // Params
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;
        const bio = req.body.bio;

        if (email == null || username == null || password == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            });
        }

        if (username.length >= 13 || username.length <= 4) {
            return res.status(400).json({
                'error': 'wrong username (must be length 5 - 12)'
            });
        }

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({
                'error': 'email is not valid'
            });
        }

        if (!PASSWORD_REGEX.test(password)) {
            return res.status(400).json({
                'error': 'password invalid (must length 4 - 12 and include 1 number at least)'
            });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        attributes: ['email'],
                        where: {
                            email: email
                        }
                    })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({
                            'error': 'unable to verify user'
                        });
                    });
            },
            function(userFound, done) {
                if (!userFound) {
                    bcrypt.hash(password, 5, function(err, bcryptedPassword) {
                        done(null, userFound, bcryptedPassword);
                    });
                } else {
                    return res.status(409).json({
                        'error': 'user already exist'
                    });
                }
            },
            function(userFound, bcryptedPassword, done) {
                const newUser = models.User.create({
                        email: email,
                        username: username,
                        password: bcryptedPassword,
                        bio: bio,
                        isAdmin: 0
                    })
                    .then(function(newUser) {
                        done(newUser);
                    })
                    .catch(function(err) {
                        return res.status(500).json({
                            err
                        });
                    });
            }
        ], function(userFound) {
            if (userFound) {
                return res.status(200).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound),
                    'isAdmin': userFound.isAdmin
                });
            } else {
                return res.status(500).json({
                    'error': 'cannot create user'
                });
            }
        });
    },
    login: function(req, res) {

        // Params
        const email = req.body.email;
        const password = req.body.password;

        if (email == null || password == null) {
            return res.status(400).json({
                'error': 'missing parameters'
            });
        }

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        where: {
                            email: email
                        }
                    })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({
                            'error' : 'cannot find user'
                        });
                    });
            },
            function(userFound, done) {
                if (userFound) {
                    bcrypt.compare(password, userFound.password, function(errBycrypt, resBycrypt) {
                        done(null, userFound, resBycrypt);
                    });
                } else {
                    return res.status(404).json({
                        'error': 'cannot find user in DB'
                    });
                }
            },
            function(userFound, resBycrypt, done) {
                if (resBycrypt) {
                    done(userFound);
                } else {
                    return res.status(403).json({
                        'error': 'invalid password'
                    });
                }
            }
        ], function(userFound) {
            if (userFound) {
                return res.status(200).json({
                    'userId': userFound.id,
                    'token': jwtUtils.generateTokenForUser(userFound),
                    'isAdmin': userFound.isAdmin
                });
            } else {
                return res.status(500).json({
                    'error': 'cannot log on user'
                });
            }
        });
    },
    getUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        if (userId < 0)
            return res.status(400).json({
                'error': 'wrong token'
            });

        models.User.findOne({
            attributes: [ 'email', 'username', 'bio'],
            where: {
                id: userId
            }
        }).then(function(user) {
            if (user) {
                res.status(201).json(user);
            } else {
                res.status(404).json({
                    'error': 'user not found'
                });
            }
        }).catch(function(err) {
            res.status(500).json({
                'error': 'cannot fetch user'
            });
        });
    },
    updateUserProfile: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        var userId = jwtUtils.getUserId(headerAuth);

        // Params
        const bio = req.body.bio;
        const username = req.body.username;

        asyncLib.waterfall([
            function(done) {
                models.User.findOne({
                        attributes: ['id', 'bio', 'username'],
                        where: {
                            id: userId
                        }
                    })
                    .then(function(userFound) {
                        done(null, userFound);
                    })
                    .catch(function(err) {
                        return res.status(500).json({
                            'error': 'unable to verify user'
                        });
                    });
            },
            function(userFound, done) {
                if (userFound) {
                    userFound.update({
                            bio: (bio ? bio : userFound.bio),
                            username: (username ? username : userFound.username)
                        })
                        .then(function() {
                            done(userFound);
                        })
                        .catch(function(err) {
                            res.status(500).json({
                                'error': 'cannot update user profile'
                            });
                        });
                } else {
                    res.status(404).json({
                        'error': 'user not found'
                    });
                }
            },
        ], function(userFound) {
            if (userFound) {
                return res.status(201).json({
                    userFound
                });
            } else {
                return res.status(500).json({
                    'error': 'cannot update user profile'
                });
            }
        });
    },
    deleteProfile: function(req, res) {
        // Getting auth header
        var headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        models.Commentaire.destroy({ 
            where : { 
                userId : userId 
            }
        })
        .then(function() {
            models.Message.destroy({ 
                where : { 
                    userId : userId
                }
            })
            .then(function() {
                models.User.destroy({ 
                    where :{ 
                        id: userId 
                    } 
                })
                .then(function() {
                    res.status(200).json({ 'message': 'user supprimé' });
                })
                .catch(function(err) {
                    res.status(400).json({ 'error': 'cannot delete user' });
                });
            })
            .catch(function(err) {
                res.status(400).json({ 'error': 'cannot delete messages' });
            });
        })
        .catch(function(err) {
            res.status(400).json({ 'error': 'cannot find user' });
        });
    }
}