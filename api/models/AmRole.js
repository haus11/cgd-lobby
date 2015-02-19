/**
* AmRole.js
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

      type: {
          type: 'string',
          enum: ['demander', 'supplier'],
          required: true
      },

      typeLetter: {
          type: 'string',
          required: true
      },

      maxValue: {
          type: 'float',
          required: true
      }
  }
};

