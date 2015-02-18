/**
* AmSession.js
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

        session: {
            model: 'session',
            required: true
        },

        role: {
            model: 'amrole',
            type: 'array'
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        },

        toJSON: function () {
            var obj = this.toObject();
            delete obj.deleted;
            return obj;
        }
    }
};

