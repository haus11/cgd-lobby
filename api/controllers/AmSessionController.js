/**
 * AmSessionController
 *
 * @description :: Server-side logic for managing Amsessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


    loop: function(user, session, index, cb) {

        console.log(index);
        if(index === user.length) {

            return cb();
        }

        var currentUser = user[index];
        var promise  = null;

        if(currentUser.type === 'player') {

            session.count = 1;

            var playerRoleIndex = index % (AMRoleService.amountOfTypes);
            var playerType = AMRoleService.getPlayerRole(playerRoleIndex);
            var typeLetter = AMRoleService.getPlayerRole(playerRoleIndex).type;

            if      (session.count == 1) playerType = playerType.session1;
            else if (session.count == 2) playerType = playerType.session2;
            else    throw "Session number not allowed";

            promise = AmRole.create({type: playerType.role, maxValue: playerType.maxValue, typeLetter: typeLetter})
                .then(function(amRole) {

                    return AmSession.create({session: session.id, role: amRole.id});
                })
                .then(function(amSession) {

                    return AmSession.findOne({id: amSession.id}).populate('role').populate('session');
                })
                .then(function(amSession) {

                    console.log(amSession.toJSON());
                    sails.sockets.emit(sails.sockets.id(UserService.get(user[index].id).socket), EventService.SESSION_NEW, amSession);
                    return sails.controllers.amsession.loop(user, session, ++index, cb);
                })
                .catch(function(error) {

                    sails.log.error(error);
                    return res.badRequest(error);
                });
        }

        if(promise === null) {
            sails.controllers.amsession.loop(user, session, ++index, cb);
        }
    },

    create: function(req, res) {

        var self = this;

        res.cb = function(game, session) {

            var playerCount = game.user.length - 1;
            playerCount = 2;

            /*if (playerCount < AMRoleService.amountOfTypes) {

             throw 'AMRoleService: Not enough players.';
             }*/

            var roles = AMRoleService.calcRoles(playerCount);

            self.loop(game.user, session, 0, function() {

                return res.json(session);
            });
        };

        sails.controllers.session.create(req, res);
    }

};

