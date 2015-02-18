/**
* EERestaurant.js
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

    user: {
      model: 'user'
    },

    offer: {
      model: 'offer'
    },

    round: {
      model: 'round'
    }
  }
};

