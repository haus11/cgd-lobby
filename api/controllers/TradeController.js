/**
 * TradeController
 *
 * @description :: Server-side logic for trades
 * @help :: See http://links.sailsjs.org/docs/controllers
 */
module.exports = {


    create: function(req, res) {

        var userID = req.session.userID;
        var gameID = req.session.gameID;

        var offerID = req.param('offerID');
        var price = req.param('price');

        var targetOffer = null;
        var targetTrade = null;

        if(typeof offerID === 'undefined') {

            return res.badRequest('Please send an offerID.');
        }

        if(typeof price === 'undefined') {

            return res.badRequest('Please send a price.');
        }

        Offer.findOne({id: offerID}).populate('seller')
            .then(function(offer) {

                if(typeof offer !== 'undefined') {

                    targetOffer = offer;

                    return Trade.create({price: price, accepted: false, buyer: userID})
                }
                else {

                    throw 'The offer could not be found.';
                }
            })
            .then(function(trade) {

                targetTrade = trade;
                targetOffer.trades.add(trade.id);
                return targetOffer.save();

            })
            .then(function(offer) {

                /*
                var acceptedTrades = 0;

                for(var index = 0; index < offer.trades.length; ++index) {

                    if(offer.trades[index].accepted) {

                        ++acceptedTrades;
                    }
                }

                if(acceptedTrades >= offer.tradesMax) {

                    sails.sockets.emit(sails.sockets.id(UserService.get(offer.seller.id).socket), EventService.OFFER_DONE, offer);
                }*/

                sails.sockets.emit(sails.sockets.id(UserService.get(offer.seller.id).socket), EventService.TRADE_CREATE, targetTrade);
                return res.json(trade);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    update: function(req, res) {

        var userID = req.session.userID;
        var gameID = req.session.gameID;

        var tradeID = req.param('tradeID');
        var price = req.param('price');


        if(typeof tradeID === 'undefined') {

            return res.badRequest('Please send a tradeID.');
        }

        if(typeof price === 'undefined') {

            return res.badRequest('Please send a price.');
        }

        Trade.findOne({id: tradeID}).populate('buyer')
            .then(function(trade) {

                if(typeof trade !== 'undefined') {

                    trade.price = price;

                    return trade.save();
                }
                else {

                    throw 'The offer could not be found.';
                }
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    }


};
