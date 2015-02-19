/**
 * AmPlayerHasType.js
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

        transactionNmbr: {
            type: 'integer',
            required: true
        },

        price: {
            type: 'float',
            required: true
        },

        round: {
            model: 'round',
            required: true
        },

        session: {
            model: 'session',
            required: true
        }
    }
};
