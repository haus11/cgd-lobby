/**
 * Created by Philipp Moehler on 17.02.15.
 */

/*
 * EESurveyService
 */

module.exports = {

    surveys: {},

    add: function(survey) {

        if(typeof survey === 'object') {

            this.surveys['SURVEY' + survey.id] = {

                gameID: survey.game,
                userWaitIDs: [],
                userVotedIDs: [],
                userRestaurantIDs: [],
                timeout: survey.timeout,
                //timeoutID: null,
                lastConsultID: 0,
                timeIntervalID: null,
                timeLeft: survey.timeout
            };

            sails.log.info('Survey added');
        }
    },

    addUserID: function(surveyID, userID) {

        if(typeof surveyID !== 'undefined' && typeof userID !== 'undefined' && this.surveys.hasOwnProperty('SURVEY'+surveyID)) {

            var survey = this.surveys['SURVEY'+surveyID];

            survey.userWaitIDs.push(userID);
            sails.log.info('Survey UserID added');
        }
    },

    removeRestaurantUser: function(surveyID, userID) {

        if(typeof surveyID !== 'undefined' && typeof userID !== 'undefined' && this.surveys.hasOwnProperty('SURVEY'+surveyID)) {

            var survey = this.surveys['SURVEY'+surveyID];

            if(survey.userRestaurantIDs.length <= 0) {

                throw 'All user already created their restaurants.';
            }

            for(var i = 0; i < survey.userRestaurantIDs.length; ++i) {


                if(survey.userRestaurantIDs[i] === userID) {

                    survey.userRestaurantIDs.splice(i, 1);

                    if(survey.userRestaurantIDs.length <= 0) {

                        sails.sockets.emit(UserService.socketToID(Game.subscribers(survey.gameID)), EEEventService.SURVEY_RESTAURANTS);
                    }

                    break;
                }
            }
        }
    },

    removeUserID: function(surveyID, userID) {

        if(typeof surveyID !== 'undefined' && typeof userID !== 'undefined' && this.surveys.hasOwnProperty('SURVEY'+surveyID)) {

            var survey = this.surveys['SURVEY'+surveyID];

            for(var i = 0; i < survey.userWaitIDs.length; ++i) {

                if(survey.userWaitIDs[i] === userID) {

                    survey.userWaitIDs.splice(i, 1);
                    break;
                }
            }
        }
    },

    vote: function(surveyID, userID, vote) {

        if(typeof surveyID !== 'undefined' && typeof userID !== 'undefined' && this.surveys.hasOwnProperty('SURVEY'+surveyID)) {

            var survey = this.surveys['SURVEY'+surveyID];

            if(survey.lastConsultID === userID) {

                survey.userVotedIDs.push(userID);
                sails.log.info('Survey user'+userID+' voted');

                if(vote) {

                    survey.userRestaurantIDs.push(userID);
                    sails.log.info('Survey user'+userID+' voted and opens restaurant');
                }
            }
            else {

                throw 'Vote time is over or its not your turn!';
            }

            this.consult(surveyID);
        }
    },

    consult: function(surveyID, timeoutUserID) {

        if(typeof surveyID !== 'undefined' && this.surveys.hasOwnProperty('SURVEY'+surveyID)) {

            var survey = this.surveys['SURVEY'+surveyID];

            clearInterval(survey.timeIntervalID);
            survey.timeLeft = survey.timeout;
            //clearTimeout(survey.timeoutID);

            if(typeof timeoutUserID !== 'undefined') {

                sails.log.info('Survey user'+timeoutUserID+' timed out');
                survey.userVotedIDs.push(timeoutUserID);

                var user = UserService.get(timeoutUserID);

                sails.sockets.emit(sails.sockets.id(user.socket), EEEventService.SURVEY_TIMEOUT, user.model);
            }
            else {
                sails.log.info('Survey consult');
            }

            if(survey.userWaitIDs.length > 0) {

                var userIDToConsult = survey.userWaitIDs.pop();

                survey.lastConsultID = userIDToConsult;

                sails.sockets.emit(sails.sockets.id(UserService.get(userIDToConsult).socket), EEEventService.SURVEY_CONSULT, {timeLeft: survey.timeLeft});

                var self = this;

                survey.timeIntervalID = setInterval(function() {

                    console.log(survey.timeLeft);
                    survey.timeLeft -= 1000;
                    sails.sockets.emit(sails.sockets.id(UserService.get(userIDToConsult).socket), EEEventService.SURVEY_TICK, {timeLeft: survey.timeLeft});

                    if(survey.timeLeft <= 0) {

                        survey.timeLeft = survey.timeout;

                        self.consult(surveyID, userIDToConsult);
                    }
                }, 1000);

                /*
                survey.timeoutID = setTimeout(function() {
                    self.consult(surveyID, userIDToConsult);
                }, survey.timeout);
                */
            }
            else {

                var self = this;
                EESurvey.update({id: surveyID}, {finished: true}).exec(function(error, result) {

                    if(error) {

                        sails.log.error(error);
                    }
                    else {

                        if(!result.length) {

                            sails.log.error('There are no surveys to update');
                        }
                        else {

                            console.log(self.surveys['SURVEY' + surveyID]);
                            sails.log.info('Survey finished');
                            var finishedSurvey = result[0];
                            sails.sockets.emit(UserService.socketToID(Game.subscribers(finishedSurvey.game)), EEEventService.SURVEY_FINISH, finishedSurvey);
                        }
                    }
                });
            }
        }
    }
};
