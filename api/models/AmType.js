/**
 * AmType.js
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

        description: {
            type: 'string',
            required: true
        },

        buyer_price: {
            type: 'float',
            required: true
        },

        seller_price: {
            type: 'float',
            required: true
        },

        deleted: {
            type: 'boolean',
            defaultsTo: false
        }
    }
};

