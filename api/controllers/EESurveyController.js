/**
 * EESurveyController
 *
 * @description :: Server-side logic for managing Eesurveys
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    create: function(req, res) {

        var gameID = req.session.gameID;
        var timeout = req.param('timeout') || 30000;

        EESurvey.findOne({game: gameID, finished: false, deleted: false})
            .then(function(survey) {

                /*
                 * check for active surveys
                 */
                if(typeof survey === 'undefined') {

                    return [EESurvey.create({game: gameID, timeout: timeout}), User.find({game: gameID})];

                }
                else {

                    throw 'There is already an active survey!';
                }
            })
            .spread(function(survey, user) {

                sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID), req.socket), EEEventService.SURVEY_START, survey);
                EESurveyService.add(survey);

                //shuffle user
                for(var j, x, i = user.length; i; j = Math.floor(Math.random() * i), x = user[--i], user[i] = user[j], user[j] = x);

                for(var index = 0; index < user.length; ++index) {

                    if(user[index].type === 'player') {

                        EESurveyService.addUserID(survey.id, user[index].id);
                    }
                }

                EESurveyService.consult(survey.id);
                return res.json(survey);

            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    vote: function(req, res) {

        var gameID = req.session.gameID;
        var userID = req.session.userID;
        var restaurant = req.param('restaurant');

        EESurvey.findOne({game: gameID, deleted: false, finished: false})
            .then(function(survey) {

                if(typeof survey !== 'undefined') {

                    if(typeof restaurant === 'undefined') {

                        //throw 'You forgot to send your vote answer';
                        restaurant = false;
                    }

                    //vote and consult next player
                    EESurveyService.vote(survey.id, userID, restaurant == true ? true : false);

                    return res.json(survey);
                }
                else {

                    throw 'No active surveys found.';
                }

            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    }

};

