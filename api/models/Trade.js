/**
* Trade.js
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

        offeredPrice: {
            type: 'float',
            required: true
        },

        accepted: {
            type: 'boolean',
            defaultsTo: false,
            required: true
        },

        user: {
            model: 'user'
        },

        offer: {
            model: 'offer'
        }
    }
};
