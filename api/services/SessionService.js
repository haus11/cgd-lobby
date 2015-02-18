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

        return null;
    },

    setCurrentSession: function(gameID, session) {

        if(typeof gameID !== 'undefined' && typeof session !== 'undefined') {

            this.games['GAME' + gameID] = {};
            this.games['GAME' + gameID].currentSession = session;
        }
    },

    getCurrentRound: function(gameID) {

        if(typeof gameID !== 'undefined' && this.games.hasOwnProperty('GAME' + gameID)) {

            return this.games['GAME' + gameID].currentRound;
        }

        return null;
    },

    setCurrentRound: function(gameID, round) {

        if(typeof gameID !== 'undefined' && typeof round !== 'undefined') {

            this.games['GAME' + gameID] = {};
            this.games['GAME' + gameID].currentRound = round;
        }
    }

};
