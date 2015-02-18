/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    allForGame: function(req, res) {

        var gameID = req.param('gameid');

        Session.find({game: gameID})
            .populate('rounds')
            .then(function(sessions) {

                return res.json(sessions);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    create: function(req, res) {

        var gameID = req.param('gameid');
        var targetGame = null;
        var targetSession = null;
        var sessionsPlayed = null;

        Game.findOne({id: gameID}).populate('sessions')
            .then(function(game) {

                if(typeof game !== 'undefined') {


                    if(!game.started) {

                        throw 'Game was not started yet.';
                    }

                    if(game.finished) {

                        throw 'Game is finished.';
                    }

                    targetGame = game;
                    return Session.find({game: game.id});
                }
                else {

                    throw 'Game with ID ' + gameID + ' could not be found';
                }
            })
            .then(function(gameSessions) {

                sessionsPlayed = gameSessions;

                if(gameSessions.length > 0) {

                    var lastSession = gameSessions[gameSessions.length - 1];
                    return Round.update({session: lastSession.id}, {finished: true});
                }

                return null;

            })
            .then(function(rounds) {

                return Session.create({game: gameID, count: sessionsPlayed.length + 1});
            })
            .then(function(session) {

                targetSession = session;

                targetGame.sessions.add(session.id);

                return targetGame.save();
            })
            .then(function(game) {

                SessionService.setCurrentRound(gameID, false);
                SessionService.setCurrentSession(gameID, targetSession.count);

                return Session.update({game: game.id, count: { '<': targetSession.count }}, {finished: true});
            })
            .then(function() {

                sails.sockets.emit(UserService.socketToID(Game.subscribers(targetGame)), EventService.SESSION_NEW, targetSession);

                return res.json(targetSession);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    createRound: function(req, res) {

        var gameID = req.param('gameid');
        var sessionCount = req.param('session');
        var targetSession = null;
        var targetRound = null;

        Game.findOne({id: gameID}).populate('sessions')
            .then(function(game) {

                if(typeof game !== 'undefined') {

                    if(!game.started) {

                        throw 'Game was not started yet.';
                    }

                    if(game.finished) {

                        throw 'Game is finished.';
                    }

                    return Session.findOne({game: gameID, count: sessionCount, deleted: false, finished: false}).populate('rounds');
                }
                else {

                    throw 'Game could not be found';
                }
            })
            .then(function(session) {

                if(typeof session !== 'undefined') {

                    targetSession = session;

                    return Round.find({session: session.id});
                }
                else {

                    throw 'Session could not be found';
                }
            })
            .then(function(rounds) {

                return Round.create({session: targetSession.id, count: rounds.length + 1});
            })
            .then(function(round) {

                targetRound = round;

                targetSession.rounds.add(round);

                return targetSession.save();
            })
            .then(function(session) {

                SessionService.setCurrentRound(gameID, targetRound.count);

                return Round.update({session: session.id, count: { '<': targetRound.count }}, {finished: true});
            })
            .then(function() {

                sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID)), EventService.SESSION_NEW_ROUND, targetRound);

                return res.json(targetRound);
            })
            .catch(function(error) {
                sails.log.error(error);
                return res.badRequest(error);
            });
    }

};

