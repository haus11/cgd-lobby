/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {


  authenticate: function(req, res) {


    if(req.session.authenticated) {


      return res.badRequest('You are already authenticated');
    }
    else {


      req.session.authenticated = true;
      return res.json('You are now authenticated');
    }

  }

};

