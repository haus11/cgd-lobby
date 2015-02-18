/**
* Offer.js
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

      price: {
          type: 'float',
          required: true
      },

      settledPrice: {
          type: 'float',
          defaultsTo: 0.0,
          required: true
      },

      user: {
          model: 'user'
      },

      round: {
          model: 'round',
      },

      trades: {
          collection: 'trade'
      }
  }
};
