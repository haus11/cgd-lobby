/**
* Games.js
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
          required: true,
          unique: true
      },
      
      deleted: {
          type: 'boolean',
          defaultsTo: false
      }
  }
};

