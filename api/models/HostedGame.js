/**
 * HostedGame.js
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

        name: {
            type: 'string',
            size: '200'
        },

        finished: {
            type: 'boolean',
            required: true,
            defaultsTo: false
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        participant_id: {
            model: 'Participant'
        }
    }
};
