/**
 * isJoinedToServer
 *
 * @module      :: Policy
 * @description :: Simple policy to allow only socket requests
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  if(req.session.gameID && req.session.userID) {

        if(typeof req.param('gameid') !== 'undefined') {

            if(req.session.gameID === parseInt(req.param('gameid'))) {

                return next();
            }
        }
        else {

            return next();
        }
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not participating at this game');
};
