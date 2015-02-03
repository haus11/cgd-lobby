/**
 * AmPlayerHasType.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {

        id: {
            primaryKey: true,
            type: 'integer',
            autoIncrement: true
        },

        price: {
            type: 'float',
            required: true
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        buyer_id: {
            model: 'AmParticipant'
        },

        seller_id: {
            model: 'AmParticipant'
        },

        am_session_id: {
            model: 'AmSession'
        },

        am_round_id: {
            model: 'AmRound'
        },

        hosted_game_id: {
            model: 'HostedGame'
        }
    }
};
