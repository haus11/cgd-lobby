/**
 * OfferController
 *
 * @description :: Server-side logic for managing Offers
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    all: function(req, res) {

        Offer.find({})
            .then(function(offers) {

                return res.json(offers);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    get: function(req, res) {

      var offerId = req.param('offerid');

      Offer.find({id: offerId})
        .then(function(offers) {

          return res.json(offers);
        })
        .catch(function(error) {

          sails.log.error(error);
          return res.badRequest(error);
        });
    },

    getRound: function(req, res) {

      var gameId = req.session.gameID;
      var roundCount = req.param('roundcount');

      Session.findOne({game: gameId})
        .then(function (session) {

          console.log(session.id);
          Round.findOne({count: roundCount, session: session.id})
            .then(function(round) {

              return res.json(round);
            })
            .catch(function (error) {

              return sails.log(res.badRequest(" " + error));
            });
        })
        .catch(function (error) {
          return sails.log(res.badRequest(" " + error));
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

          sails.log.error(error);
          return res.badRequest(error);
        })
    },

    create: function(req, res) {

        var price     = req.param('price');
        var userId    = req.param('userId');
        var gameId    = req.session.gameID;
        var roundId   = SessionService.getCurrentRound(gameId);

       Offer.create({price: price, seller: userId, round: parseInt(roundId)})
           .then(function (offer) {

               sails.sockets.emit(UserService.socketToID(Game.subscribers(gameId)), EventService.OFFER_CREATED, offer);
               return res.json(offer);
           })
           .catch(function (error) {

               return console.log(res.badRequest(" " + error));
           });

    },

    update: function(req, res) {

        var OfferId = req.param('offerid');

        Offer.findOne({id: OfferId})
            .then(function(offer) {

                if(typeof offer !== 'undefined') {

                    offer.price         = typeof req.param('price')         !== 'undefined' ? req.param('price')        : parseFloat(offer.price);
                    offer.settledPrice  = typeof req.param('settledPrice')  !== 'undefined' ? req.param('settledPrice') : parseFloat(offer.settledPrice);

                    return offer.save();
                }
                else {

                    throw 'Offer with ID ' + OfferId + ' not found!';
                }
            })
            .then(function(savedOffer) {
                return res.json(savedOffer);
            })
            .catch(function(error) {
                sails.log.error(error);
                return res.badRequest(error);
            });
    }
};

