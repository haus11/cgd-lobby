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

      number: {
          type: 'integer',
          required: true
      },

      max: {
          type: 'integer',
          required: true
      },

      finished: {
          type: 'boolean',
          required: true,
          defaultsTo: false
      },

      created_at: {
          type: 'int',
          required: true,
          defaultsTo: 0000
      },

      updated_at: {
          type: 'int',
          required: true,
          defaultsTo: 0000
      },

      deleted: {
          type: 'boolean',
          defaultsTo: false
      },

      session: {
          model: 'session'
      }
  }
};

