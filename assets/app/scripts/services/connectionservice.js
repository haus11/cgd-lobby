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
  .service('connectionService', function ($rootScope) {
    // -----------------------------------------------------------------------------
    // Create the connection to the game server. The "io" variable is the global
    // sails.io object. As an angular service will be instantiated only once, we can
    // connect to the server here.
    // -----------------------------------------------------------------------------
    io.sails.autoConnect = false;
    io.sails.url = 'http://localhost:1337';

    var socket = io.sails.connect();


    return {
      get: function(url, payload, callback) {
        socket.get(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      post: function(url, payload, callback) {
        socket.get(url, payload, function() {
          var args = arguments;
          $rootScope.$apply(function() {
            callback.apply(socket, args);
          });
        });
      },

      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      },

      removeAllListeners: function() {
        socket.removeAllListeners();
      }
    };
  });
