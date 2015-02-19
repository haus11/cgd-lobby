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

        var offerID = req.param('offerid');
        var price = req.param('price');
        var directAccept = req.param('direct');

        var targetOffer = null;
        var targetTrade = null;

        if(typeof offerID === 'undefined') {

            return res.badRequest('Please send an offerID.');
        }

        if(typeof price === 'undefined') {

            return res.badRequest('Please send a price.');
        }

        Offer.findOne({id: offerID, sold: false}).populate('seller')
            .then(function(offer) {

                if(typeof offer !== 'undefined') {

                    targetOffer = offer;

                    return Trade.create({game: gameID, price: price, accepted: false, buyer: userID, offer: offer.id, lastTurnUserID: userID});
                }
                else {

                    throw 'The offer could not be found or is sold.';
                }
            })
            .then(function(trade) {

                targetTrade = trade;
                targetOffer.trades.add(trade.id);
                return targetOffer.save();

            })
            .then(function(offer) {

                if(directAccept === true) {

                    req.offer = offer;
                    req.directAccept = true;
                    req.trade = targetTrade;
                    return sails.controllers.trade.accept(req, res);
                }

                sails.sockets.emit(sails.sockets.id(UserService.get(offer.seller.id).socket), EventService.TRADE_CREATE, targetTrade);
                return res.json(targetTrade);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    update: function(req, res) {

        var userID = req.session.userID;
        var gameID = req.session.gameID;

        var tradeID = req.param('tradeid');
        var price = req.param('price');


        if(typeof tradeID === 'undefined') {

            return res.badRequest('Please send a tradeID.');
        }

        if(typeof price === 'undefined') {

            return res.badRequest('Please send a price.');
        }

        Trade.findOne({id: tradeID, accepted: false}).populate('buyer').populate('offer')
            .then(function(trade) {

                if(typeof trade !== 'undefined') {

                    if(trade.lastTurnUserID === userID) {

                        throw 'It is not your turn!';
                    }

                    trade.price = price;
                    trade.lastTurnUserID = userID;

                    return trade.save();
                }
                else {

                    throw 'The offer could not be found or was accepted.';
                }
            })
            .then(function(trade) {

                //update comes from buyer
                if(trade.buyer.id === userID) {

                    sails.sockets.emit(sails.sockets.id(UserService.get(trade.offer.seller).socket), EventService.TRADE_UPDATE, trade);
                }
                //update comes from seller
                else {

                    sails.sockets.emit(sails.sockets.id(UserService.get(trade.buyer.id).socket), EventService.TRADE_UPDATE, trade);
                }

                return res.json(trade);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    accept: function(req, res) {

        var userID = req.session.userID;
        var gameID = req.session.gameID;

        var tradeID = req.param('tradeid');
        var targetTrade = null;

        if(req.directAccept === true) {

            tradeID = req.trade.id;

            if(parseFloat(req.trade.price) !== parseFloat(req.offer.price)) {

                throw 'Trade price must be offer price for direct accept!';
            }
        }

        if(typeof tradeID === 'undefined') {

            return res.badRequest('Please send a tradeID.');
        }

        Trade.findOne({id: tradeID, accepted: false}).populate('buyer').populate('offer')
            .then(function(trade) {

                if(typeof trade !== 'undefined') {

                    if(trade.lastTurnUserID === userID && !req.directAccept) {

                        throw 'It is not your turn!';
                    }

                    trade.accepted = true;
                    trade.lastTurnUserID = userID;

                    return trade.save();
                }
                else {

                    throw 'The offer could not be found or was already accepted.';
                }
            })
            .then(function(trade) {

                targetTrade = trade;

                AMTransactionService.build(trade, function(transaction) {

                    console.log(transaction);
                    sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID)), AMEventService.TRANSACTIONS_UPDATED, transaction);
                });

                //update comes from buyer
                if(trade.buyer.id === userID) {

                    sails.sockets.emit(sails.sockets.id(UserService.get(trade.offer.seller).socket), EventService.TRADE_ACCEPT, trade);
                }
                //update comes from seller
                else {

                    sails.sockets.emit(sails.sockets.id(UserService.get(trade.buyer.id).socket), EventService.TRADE_ACCEPT, trade);
                }

                return Offer.findOne({id: trade.offer.id}).populate('trades');
            })
            .then(function(offer) {

                var acceptedTrades = 0;

                for(var index = 0; index < offer.trades.length; ++index) {

                    if(offer.trades[index].accepted) {

                        ++acceptedTrades;
                    }
                }

                if(acceptedTrades >= offer.tradesMax) {

                    offer.sold = true;
                    offer.save(function(error, result) {

                        sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID)), EventService.OFFER_DONE, result);
                    });
                }

                return res.json(targetTrade);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    }


};
