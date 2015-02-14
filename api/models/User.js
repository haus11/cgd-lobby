/**
* User.js
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

    deleted: {
      type: 'boolean',
      defaultsTo: false
    },

    type: {
      type: 'string',
      enum: ['player', 'spectator', 'master'],
      defaultsTo: 'player',
      required: true
    },

    game:{
      model:'game',
      required: true
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.deleted;
      return obj;
    }
  }
};

