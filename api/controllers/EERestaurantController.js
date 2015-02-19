/**
 * EERestaurantController
 *
 * @description :: Server-side logic for managing Eerestaurants
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    create: function(req, res) {


        var gameID = req.session.gameID;
        var userID = req.session.userID;

        var name = req.param('name');
        var price = req.param('price');

        var round = SessionService.getCurrentRound(gameID);

        if(round === null) {

            return res.badRequest('There is no active round!');
        }


        EERestaurant.findOne({user: userID, round: round.id})
            .then(function(restaurant) {

                if(typeof restaurant === 'undefined') {


                    if(typeof name === 'undefined' || typeof price === 'undefined') {

                        throw 'Name and price is required';
                    }

                    return Offer.create({price: price, seller: userID, round: round, tradesMax: 4});
                }
                else {

                    throw 'You already created a restaurant in this round';
                }

            })
            .then(function(offer) {

                return EERestaurant.create({name: name, user: userID, round: round.id, offer: offer.id});
            })
            .then(function(restaurant) {

                return [EERestaurant.findOne({id: restaurant.id}).populate('offer').populate('user').populate('round'), EESurvey.findOne({game: gameID, deleted: false, sort: 'createdAt DESC'})];
            })
            .spread(function(restaurant, survey) {

                sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID)), EEEventService.RESTAURANT_CREATE, restaurant);

                if(typeof survey !== 'undefined') {


                    EESurveyService.removeRestaurantUser(survey.id, restaurant.user.id);
                }


                return res.json(restaurant);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    },

    update: function(req, res) {

        var gameID = req.session.gameID;
        var userID = req.session.userID;

        var round = SessionService.getCurrentRound(gameID);

        if(round === null) {

            return res.badRequest('There is no active round!');
        }


        EERestaurant.findOne({user: userID, round: round.id}).populate('offer')
            .then(function(restaurant) {

                if(typeof restaurant !== 'undefined') {

                    if(typeof req.param('price') !== 'undefined') {

                        restaurant.offer.price = parseFloat(req.param('price'));

                        return restaurant.save();
                    }
                    else {

                        return res.json(restaurant);
                    }
                }
                else {

                    throw 'You havent created a restaurant';
                }

            })
            .then(function(restaurant) {

                sails.sockets.emit(UserService.socketToID(Game.subscribers(gameID)), EEEventService.RESTAURANT_UPDATE, restaurant);

                return res.json(restaurant);
            })
            .catch(function(error) {

                sails.log.error(error);
                return res.badRequest(error);
            });
    }

};

