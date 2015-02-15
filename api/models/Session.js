/**
* Session.js
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

        game: {
            model: 'game',
            required: true
        },

        rounds: {
            collection: 'round',
            type: 'array'
        },

        finished: {
            type: 'boolean',
            defaultsTo: false
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.deleted;
            delete obj.game;
            return obj;
        }
    }
};

