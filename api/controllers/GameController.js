/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



    remove: function(req, res) {

        Game.destroy({id: { '!=': 0 }}).exec(function(error, data) {

            console.log(error);
            console.log(data);

            return res.json(data);
        });
    },

    get: function(req, res) {

        var gameID = req.param('gameid');

        Game.findOne({id: gameID, deleted: false})
            .populate('user')
            .populate('module')
            .populate('sessions')
            .then(function(game) {

                if(typeof game !== 'undefined') {

                    var sessions = Session.find({game: game.id}).populate('rounds');

                    res.json(game);
                }
                else {

                    throw 'Game could not be found';
                }
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    all: function(req, res) {

        var limit   = req.param('limit')  || 30;
        var skip    = req.param('skip')   || 0;

        Game.watch(req.socket);

        Game.find({limit: limit, skip: skip, sort: 'createdAt DESC', deleted: false, started: false, finished: false})
            .populate('user')
            .populate('module')
            .then(function(games) {

                return res.json(games);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    start: function(req, res) {


        var gameID = req.param('gameid');

        Game.findOne({id: gameID})
            .then(function(game) {

                if(typeof game !== 'undefined') {

                    if(game.started) {

                      throw 'Game is already started';
                    }

                    game.started = true;

                    return game.save();
                }
                else {

                    throw 'Game could not be found';
                }
            })
            .then(function(game) {

                SessionService.setCurrentRound(gameID, null);
                SessionService.setCurrentSession(gameID, null);

                sails.sockets.emit(UserService.socketToID(Game.subscribers(game)), EventService.GAME_START, game);

                return res.json(game);
            })
            .catch(function(error) {
                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    finish: function(req, res) {


        var gameID = req.param('gameid');
        var targetGame = null;

        Game.findOne({id: gameID})
            .then(function(game) {

                if(typeof game !== 'undefined') {


                    if(!game.started) {

                        throw 'Game was not started yet.';
                    }

                    if(game.finished) {

                      throw 'Game is already finished';
                    }

                    game.finished = true;

                    return game.save();
                }
                else {

                    throw 'Game could not be found';
                }
            })
            .then(function(game) {

                targetGame = game;
                return Session.update({game: game.id}, {finished: true});
            })
            .then(function() {

                return Session.findOne({game: gameID, sort: 'createdAt DESC'});
            })
            .then(function(session) {

                if(typeof session !== 'undefined' && session !== null) {

                    return Round.findOne({session: session.id, sort: 'createdAt DESC'});
                }

                return null;
            })
            .then(function(round) {

                if(typeof round !== 'undefined' && round !== null) {

                    round.finished = true;
                    return round.save();
                }

                return null;
            })
            .then(function() {

                sails.sockets.emit(UserService.socketToID(Game.subscribers(targetGame)), EventService.GAME_FINISH, targetGame);

                return res.json(targetGame);
            })
            .catch(function(error) {
                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    update: function(req, res) {

        var gameID = req.param('gameid');

        Game.findOne({id: gameID})
            .then(function(game) {

                if(typeof game !== 'undefined')  {

                    if(game.started) {

                        throw 'Game was already started, can not change settings!';
                    }

                    game.name = typeof req.param('name') !== 'undefined' ? req.param('name') : game.name;
                    game.playerMax = typeof req.param('playerMax') !== 'undefined' ? req.param('playerMax') : parseInt(game.playerMax);

                    return game.save();
                }
                else {

                    throw 'Game with ID ' + gameID + ' not found!';
                }
            })
            .then(function(savedGame) {

                Game.publishUpdate(savedGame.id, savedGame);

                return res.json(savedGame);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    leave: function(req, res) {

        var gameID = req.param('gameid');

        Game.findOne({id: gameID}).populate('user')
            .then(function(game) {

                if(!game) {

                    throw "Game with ID " + gameID + " could not be found";
                }
                else {

                    var user = UserService.get(gameID).model;

                    game.user.remove(user.id);

                    game.save(function(error, game) {

                        if(error) {

                            return res.badRequest(error);
                        }
                        else {

                            req.session.userID = false;
                            req.session.gameID = false;

                            UserService.remove(user.id);

                            sails.sockets.emit(UserService.socketToID(Game.subscribers(game)), EventService.GAME_PLAYER_LEAVE, user);
                            Game.unsubscribe(req.socket, game);

                            return res.json(game);
                        }
                    });
                }

            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });

    },

    join: function(req, res) {

        if(req.session.gameID) {

            return res.badRequest('You are already participating on a server');
        }

        var gameID = req.param('gameid');
        var username = req.param('username');
        var gameToJoin = null;

        if(typeof gameID === 'undefined') {

            return res.badRequest('Please specify a gameID!');
        }
        else if(typeof username !== 'string') {

            return res.badRequest('Please specify a username!');
        }
        else {

            Game.findOne({id: gameID}).populate('user').populate('module')
                .then(function(game) {

                    if(!game) {

                        throw "Game with ID " + gameID + " could not be found";
                    }
                    else {

                        gameToJoin = game;

                        /*
                         * TODO: refactor gamemaster as seperate attribute in model (and spectators as list)
                         */

                        //substract gamemaster
                        if(game.user.length - 1 >= game.playerMax) {

                            throw "Maximum amount of players for this game is reached.";
                        }

                        return User.create({name: username, type: 'player', game: game.id});
                    }

                })
                .then(function(user) {

                    gameToJoin.user.add(user.id);

                    gameToJoin.save(function(error, game) {

                        if(error) {

                            return res.badRequest(error);
                        }
                        else {

                            req.session.userID = user.id;
                            req.session.gameID = game.id;

                            UserService.set(user, req.socket);

                            sails.sockets.emit(UserService.socketToID(Game.subscribers(game)), EventService.GAME_PLAYER_JOIN, user);
                            Game.subscribe(req.socket, game);

                            return res.json({game: game, user: user});
                        }
                    });

                })
                .catch(function(error) {

                    sails.log.error(error);
                    return res.badRequest(error);
                });
        }

    },

    destroy: function(req, res) {

        var gameID = req.param('gameid');

        Game.findOne({id: gameID})
            .then(function(game) {

                if(typeof game !== 'undefined')  {

                    game.deleted = true;

                    game.save(function(error, savedGame) {

                        Game.publishDestroy(savedGame.id);

                        return res.json(savedGame);
                    });
                }
                else {

                    throw 'Game with ID ' + gameID + ' not found!';
                }
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    create: function(req, res) {

        if(req.session.gameID) {

            return res.badRequest('You are already participating on a server');
        }

        var playerMax = req.param('playerMax') || 20;
        var name = req.param('name');
        var moduleSecret = req.param('secret');
        var createdGame = null;

        Module
            .findOne({secret: moduleSecret})
            .then(function(module) {

                if(typeof module === 'undefined') {

                    throw "Specified secret for module is not existent";
                }
                else {

                    return Game.create({playerMax: playerMax, name: name, module: module.id}).populate('user').populate('module');
                }
            })
            .then(function(game) {

                createdGame = game;

                return User.create({name: 'Gamemaster', type: 'master', game: game.id});
            })
            .then(function(user) {

                createdGame.user.add(user.id);

                createdGame.save(function(error, game) {

                    if(error) {

                        sails.log.error(error);
                        return res.badRequest(error);
                    }
                    else {

                        Game.publishCreate(game);
                        Game.subscribe(req.socket, game);

                        req.session.userID = user.id;
                        req.session.gameID = game.id;
                        UserService.set(user, req.socket);

                        return res.json({game: game, user: user});
                    }
                });
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    }
};

