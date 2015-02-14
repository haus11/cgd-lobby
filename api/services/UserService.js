/*
 * UserService
 */

module.exports = {

  activeUser: {},

  get: function(userID) {

    if(typeof userID !== 'undefined' && this.activeUser.hasOwnProperty('USER.' + userID)) {

      return this.activeUser['USER.'+userID];
    }

    return null;
  },

  set: function(user, socket) {

    if(typeof user === 'object') {

      this.activeUser['USER.' + user.id] = {

        model: user,
        socket: typeof socket === 'object' ? socket : this.activeUser['USER.' + user.id].socket
      };

      return true;
    }

      return false;
  },

  socketToID: function (sockets) {

    if (sockets instanceof Array) {

      var socketIDArray = [];

      for (var index = 0; index < sockets.length; ++index) {

        socketIDArray.push(sails.sockets.id(sockets[index]));
      }

      return socketIDArray;

    }
    else {

      return sails.sockets.id(sockets);
    }
  },

  remove: function(userID) {

    if(typeof userID !== 'undefined' && this.activeUser.hasOwnProperty('USER.' + userID)) {


      return true;
    }

    return false;
  },

  deliver: function(from, to, event, data) {

    if(typeof from !== 'undefined' && typeof to !== 'undefined' && this.activeUser.hasOwnProperty('USER.' + to) && typeof event !== 'undefined' && typeof data !== 'undefined') {

      data.from = from;
      sails.sockets.emit(sails.sockets.id(this.activeUser['USER.' + to]), event, data);
      return true;
    }

    return false;
  }
};
