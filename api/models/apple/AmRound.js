/**
 * AmRound.js
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

        number: {
            type: 'integer',
            required: true
        },

        max: {
            type: 'integer'
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        am_session_id: {
            model: 'AmSession'
        }
    }
};
