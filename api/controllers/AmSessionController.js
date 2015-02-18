/**
 * AmSessionController
 *
 * @description :: Server-side logic for managing Amsessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    create: function(req, res) {


        res.cb = function(game, session) {



            //rolle zuteilen



            for(var index = 0; index < game.user.length; ++i) {

                if(game.user[index].type === 'player') {

                    //var amSession = ;

                    //sails.sockets.emit(sails.sockets.id(UserService.get(game.user[index].id).socket), EventService.SESSION_NEW_ROUND, amSession);
                }
            }


            return res.json(session);
        };

        sails.controllers.session.create(req, res);
    }

};

