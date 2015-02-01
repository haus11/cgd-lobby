/**
 * TransactionController
 *
 * @description :: Server-side logic for managing games
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    //_config: {
    //    model: 'amtransaction'
    //},

    test: function(req, res) {

        res.json({msg: 'hello'});
    },

    getTransactionsOfPlayer: function(req, res) {

        var player = req.param('player');
        var server = req.param('server');

        AmTransaction.find({buyer: player, seller: player, server: server}).exec(function (err, transaction) {

            if (!err) {

                return res.json(transaction);
            }
            else {

                res.badRequest(err);
            }
        });
    },

    getTransactionsOfRound: function(req, res) {

        var round   = req.param('round');
        var server  = req.param('server');

        AmTransaction.find({round: round, server: server}).exec(function (err, transaction) {

            if (!err) {

                return res.json(transaction);
            }
            else {

                res.badRequest(err);
            }
        });

    },

    getTransactionsOfSession: function(req, res) {

        var session = req.param('session');
        var server  = req.param('server');

        AmTransaction.find({session: session, server: server}).exec(function (err, transaction) {

            if (!err) {

                return res.json(transaction);
            }
            else {

                res.badRequest(err);
            }
        });
    },

    getTransactionsOfServer: function(req, res) {

        var server = req.param('server');

        AmTransaction.find({server: server}).exec(function (err, transaction) {

            if (!err) {

                return res.json(transaction);
            }
            else {

                res.badRequest(err);
            }
        });
    }
};
