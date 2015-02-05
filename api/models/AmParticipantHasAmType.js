/**
 * AmParticipantHasType.js
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

        participant_id: {
            model: 'Participant'
        },

        am_type_id: {
            model: 'AmType'
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};