/**
 * GameController
 *
 * @description :: Server-side logic for managing Games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  all: function(req, res) {

    var limit   = req.param('limit')  || 30;
    var skip    = req.param('skip')   || 0;

    Game.watch(req.socket);
    Game.find({limit: limit, skip: skip, sort: 'createdAt DESC', deleted: false, started: false, finished: false}).populate('user').populate('module').exec(function (error, game) {

      if (!error) {

        return res.json(game);
      }
      else {

        res.badRequest(error);
      }
    });
  },

  update: function(req, res) {

    var gameID = req.param('id');

    /*
    console.log(req.allParams());
    Game.update({id: gameID}, req.allParams())
      .then(function(game) {

        console.log(game);

        return res.json(game);
      })
      .catch(function(error) {
        sails.log.error(error);
        return res.badRequest(error);
      });
    */

    Game.findOne({id: gameID})
      .then(function(game) {

        if(typeof game !== 'undefined')  {

          var gameWasStartedBefore = game.started;
          var gameWasFinishedBefore = game.finished;

          game.started = typeof req.param('started') !== 'undefined' ? req.param('started') : game.started;
          game.finished = typeof req.param('finished') !== 'undefined' ? req.param('finished') : game.finished;
          game.sessionMax = typeof req.param('sessionMax') !== 'undefined' ? req.param('sessionMax') : parseInt(game.sessionMax);
          game.playerMax = typeof req.param('playerMax') !== 'undefined' ? req.param('playerMax') : parseInt(game.playerMax);

          game.save(function(error, savedGame) {

            if(error) {

              throw error;
            }


            if(!gameWasStartedBefore && savedGame.started) {

              sails.sockets.emit(UserService.socketToID(Game.subscribers(savedGame)), EventService.GAME_START, savedGame);
            }

            if(!gameWasFinishedBefore && savedGame.finished) {

              sails.sockets.emit(UserService.socketToID(Game.subscribers(savedGame)), EventService.GAME_FINISH, savedGame);
            }


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

  leave: function(req, res) {

    var gameID = req.param('id');

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

    var gameID = req.param('gameID');
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

              return res.json(game);
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

    var gameID = req.param('id');

    Game.findOne({id: gameID})
      .then(function(game) {

        if(typeof game !== 'undefined')  {

          game.deleted = true;

          game.save(function(error, savedGame) {

            sails.sockets.emit(UserService.socketToID(Game.subscribers(game)), EventService.GAME_DESTROY, savedGame);

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
    var sessionMax = req.param('sessionMax') || 3;
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

          return Game.create({playerMax: playerMax, sessionMax: sessionMax, name: name, module: module.id}).populate('user').populate('module');
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

            return res.json(game);
          }
        });
      })
      .catch(function(error) {

        sails.log.error(error);
        return res.badRequest(error);
      });
  }
};

