/**
 * Created by david on 2/19/15.
 */

/*
 * AMTransactionService
 */
module.exports = {

    sortTransactionNmbrs: function (first, second) {

        if (first.transactionNmbr == second.transactionNmbr)
            return 0;
        if (first.transactionNmbr < second.transactionNmbr)
            return -1;
        else
            return 1;
    },

    build: function(trade, callback) {

        var targetSession = null;
        var targetOffer   = null;

        Trade.findOne({id: trade.id}).populate('offer')
            .then(function(populatedTrade) {

                return Offer.findOne({id: populatedTrade.offer.id}).populate('round');
            })
            .then(function(offer) {

                targetOffer = offer;
                return Session.findOne({id: offer.round.session});
            })
            .then(function(session) {

                targetSession = session;
                console.log("tradegame:" + trade.game.id);
                return AmTransaction.findOne({sort: 'transactionNmbr DESC', game: trade.game.id});
            })
            .then(function(previousTransaction) {

                var tNumb = 1;
                console.log(previousTransaction);

                if(typeof previousTransaction !== 'undefined') {

                    tNumb = parseInt(previousTransaction.transactionNmbr) + 1;
                }

                return AmTransaction.create({game: trade.game, round: targetOffer.round.count, session: targetSession.count, transactionNmbr: tNumb, price: trade.price})
            })
            .then(function(transaction) {

                callback(transaction);
            })
            .catch(function(error) {

                sails.log.error(error);
            });
    }
}
