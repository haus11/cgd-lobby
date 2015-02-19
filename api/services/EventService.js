/*
 * EventService
 */


/*
 * TODO: refactor events to sails.config.events file (events.js in config folder)
 */

module.exports = {

    GAME_PLAYER_JOIN    : 'game:playerJoined',
    GAME_PLAYER_LEAVE   : 'game:playerLeaved',
    GAME_START          : 'game:started',
    GAME_FINISH         : 'game:finished',

    OFFER_CREATED       : 'offer:create',


    SESSION_NEW         : 'session:new',
    SESSION_NEW_ROUND   : 'session:newRound',



    TRADE_CREATE        : 'trade:created',
    TRADE_UPDATE        : 'trade:updated',
    TRADE_ACCEPT        : 'trade:accepted'
};
