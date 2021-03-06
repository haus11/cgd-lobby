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

    testMethod: function(req, res) {
        return res.send("Hi there!");
    },

    all: function(req, res) {

        AmTransaction.find().exec(function(error, transactions) {

            if(!error) {

                return res.json(transactions);
            }
            else {

                return res.badRequest(error);
            }
        });
    },

    handle: function(price, index, callback) {

        if(index >= 28) {

            callback();
            return;
        }

        AmTransaction.create({
            price: Math.floor(Math.random() * (40.0 - 10.0)) + 10.0,
            transactionNmbr: index + 1
        }).exec(function(error, transaction) {
            if (error) {
                callback(error);
                return;
            } else {
                sails.controllers.amtransaction.handle(price, ++index, callback);
            }

        });

    },

    test: function(req, res) {

        var price = req.param('price') || 1.25;

        sails.controllers.amtransaction.handle(1.2, 0, function(error) {

            if(error) {

                return res.badRequest(error);
            }
            else {

                return res.json({msg: 'done'});
            }
        });
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
    },

    getCompletedTransactions: function(req, res) {

        var gameID = req.session.gameID;

        AmTransaction.find({game: gameID})
            .then(function(transactions) {

                return res.json(transactions);
            })
            .catch(function(error) {

                sails.log(error);
                return res.badRequest(error);
            });

        /*
        AmTransaction.find({})
            .then(function(amTransactions) {


                return res.json(amTransactions);
            })
            .catch(function(error) {

                sails.log(error);
                return res.badRequest(error);
            });*/
    }
};
