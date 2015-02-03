/**
 * AmParticipant.js
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

        player_name: {
            type: 'string',
            size: '200',
            required: true
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        hosted_game: {
            model: 'HostedGame'
        }
    }
};
