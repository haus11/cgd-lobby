/**
* Game.js
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
      required: true
    },

    playerMax: {
      type: 'integer',
      required: false,
      defaultsTo: 20
    },

    sessionMax: {
      type: 'integer',
      required: false,
      defaultsTo: 3
    },

    module:{
      model: 'module',
      required: true
    },

    sessions: {
        collection: 'session',
        type: 'array'
    },

    user: {
      collection: 'user',
      type: 'array'
    },

    started: {
      type: 'boolean',
      defaultsTo: false
    },

    finished: {
      type: 'boolean',
      defaultsTo: false
    },

    deleted: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.deleted;
      return obj;
    }
  }
};

