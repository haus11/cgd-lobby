/**
 * EeSession.js
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

        fixed_costs: {
            type: 'float',
            required: true
        },

        variable_costs: {
            type: 'float',
            required: true
        },

        finished: {
            type: 'boolean',
            required: true,
            defaultsTo: false
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};
