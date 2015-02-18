/**
 * isMaster
 *
 * @module      :: Policy
 * @description :: Simple policy to allow only player type with master
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller

  if (req.session.gameID && req.session.userID) {

    var user = UserService.get(req.session.userID);

    if(user !== null && user.model.type === 'player') {

      return next();
    }
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  return res.forbidden('You are not permitted to perform this action, because you are no game master.');
};
