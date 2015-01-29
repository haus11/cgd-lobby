/* global io */
'use strict';

/**
 * @ngdoc service
 * @name assetsApp.connectionService
 * @description
 * # connectionService
 * Service in the assetsApp.
 */
angular.module('equilibrium')
  .service('connectionService', function () {
    // -----------------------------------------------------------------------------
    // Create the connection to the game server. The "io" variable is the global
    // sails.io object. As an angular service will be instantiated only once, we can
    // connect to the server here.
    // -----------------------------------------------------------------------------
    io.sails.autoConnect = false;
    io.sails.url = 'http://localhost:1337';

    var socket = io.sails.connect();

    return {
      //socket : socket
    };
  });
