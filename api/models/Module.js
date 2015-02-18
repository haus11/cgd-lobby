/**
* Module.js
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
      required: true,
      unique: true
    },

    secret: {
      type: 'string',
      required: true
    },

    url: {
      type: 'string',
      required: true,
      unique: true
    },

    deleted: {
      type: 'boolean',
      defaultsTo: false
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.deleted;
      delete obj.secret;
      return obj;
    }
  }
};

