/**
 * Created by Philipp Moehler on 17.02.15.
 */

/*
 * SessionService
 */

module.exports = {

    games: {},

    getCurrentSession: function(gameID) {

        if(typeof gameID !== 'undefined' && this.games.hasOwnProperty('GAME' + gameID)) {

            return this.games['GAME' + gameID].currentSession;
        }

        return false;
    },

    setCurrentSession: function(gameID, sessionCount) {

        if(typeof gameID !== 'undefined' && typeof sessionCount !== 'undefined') {

            this.games['GAME' + gameID] = {};
            this.games['GAME' + gameID].currentSession = parseInt(sessionCount);
        }
    },

    getCurrentRound: function(gameID) {

        if(typeof gameID !== 'undefined' && this.games.hasOwnProperty('GAME' + gameID)) {

            return this.games['GAME' + gameID].currentRound;
        }

        return false;
    },

    setCurrentRound: function(gameID, roundCount) {

        if(typeof gameID !== 'undefined' && typeof roundCount !== 'undefined') {

            this.games['GAME' + gameID] = {};
            this.games['GAME' + gameID].currentRound = parseInt(roundCount);
        }
    }

};
