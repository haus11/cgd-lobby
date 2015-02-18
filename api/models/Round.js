/**
* Round.js
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

        count: {
            type: 'integer',
            required: true
        },

        session: {
            model: 'session',
            required: true
        },

        finished: {
            type: 'boolean',
            defaultsTo: false
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        rounds: {
            collection: 'offer'
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.session;
            delete obj.deleted;
            return obj;
        }
    }
};

