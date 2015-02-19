/**
 * OfferController
 *
 * @description :: Server-side logic for managing Offers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    create: function(req, res) {

        var price     = req.param('price');
        var userID    = req.session.userID;
        var gameID    = req.session.gameID;
        var round     = SessionService.getCurrentRound(gameID);

        if(typeof price === 'undefined') {

            return res.badRequest('Please specify a price');
        }

       Offer.create({price: price, seller: userID, round: round.id, tradesMax: 1})
           .then(function (offer) {

               return Offer.findOne({id: offer.id}).populate('seller');
           })
           .then(function(offer) {

               sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID)), EventService.OFFER_CREATED, offer);
               return res.json(offer);
           })
           .catch(function (error) {

               sails.log.error(error);
               return res.badRequest(error);
           });

    },

    update: function(req, res) {

        var userID    = req.session.userID;
        var gameID    = req.session.gameID;

        var offerID = req.param('offerid');
        var price = req.param('price');

        if(typeof offerID === 'undefined') {

            return res.badRequest('Please specify an offerID!');
        }

        if(typeof price === 'undefined') {

            return res.badRequest('Please specify a price!');
        }

        Offer.findOne({id: offerID}).populate('seller')
            .then(function(offer) {

                if(typeof offer !== 'undefined') {

                    if(offer.seller.id !== userID) {

                        throw 'You are not permitted!';
                    }

                    offer.price = parseFloat(req.param('price'));

                    return offer.save();
                }
                else {

                    throw 'Offer was not found!';
                }
            })
            .then(function(savedOffer) {

                sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID)), EventService.OFFER_UPDATED, savedOffer);
                return res.json(savedOffer);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    getCurrentRound: function(req, res) {

        var gameId  = req.session.gameID;
        var round   = SessionService.getCurrentRound(gameId);

        Offer.find({round: round.id})
            .then(function (rounds) {

                return res.json(rounds);
            })
            .catch(function (error) {

                sails.log(error);
                return res.badRequest(error);
            })
    }
};

