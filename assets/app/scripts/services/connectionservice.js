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
  .service('connectionService', function ($rootScope, $q) {
    // -----------------------------------------------------------------------------
    // Create the connection to the game server. The "io" variable is the global
    // sails.io object. As an angular service will be instantiated only once, we can
    // connect to the server here.
    // -----------------------------------------------------------------------------
    io.sails.autoConnect = false;
    //io.sails.url = 'http://192.168.0.198:1338/'; //'http://localhost:1338/'
    io.sails.url = 'http://haus11.org:1338/';

    var socket = io.sails.connect();


    // -----------------------------------------------------------------------------
    // Setup connect and error events
    // TODO: Use notification service or something to notify user whats going on
    // -----------------------------------------------------------------------------
    socket.on('connect', function() {
      console.log('Successfully connected.');
    });

    socket.on('reconnect', function() {
      console.log('Successfully reconnected.');
    });

    socket.on('connect_error', function() {
      console.log('Connection error.');
    });

    socket.on('reconnect_failed', function() {
      console.log('Could not reconnect within specified reconnection attempts.');
    });


    // -----------------------------------------------------------------------------
    // Checks an api response and resolves or rejects the promise
    // -----------------------------------------------------------------------------
    function checkResponse(data, jwrs, resolveCallback, rejectCallback)
    {
      if (jwrs.statusCode === 200)
      {
        $rootScope.$apply(function() {
          resolveCallback(data);
        });
      }
      else
      {
        $rootScope.$apply(function() {
          rejectCallback(jwrs.body);
        });
      }
    }

    // -----------------------------------------------------------------------------
    // Public api of the connection service
    // -----------------------------------------------------------------------------
    return {
      get: function(url, payload) {
        return $q(function(resolve, reject) {
          if (!socket.isConnected()) { reject('Socket is not connected!'); }

          socket.get(url, payload, function(data, jwrs) {
            checkResponse(data, jwrs, resolve, reject);
          });
        });
      },

      post: function(url, payload) {
        return $q(function(resolve, reject) {
          if (!socket.isConnected()) { reject('Socket is not connected!'); }

          socket.post(url, payload, function(data, jwrs) {
            checkResponse(data, jwrs, resolve, reject);
          });
        });
      },

      put: function(url, payload) {
        return $q(function(resolve, reject) {
          if (!socket.isConnected()) { reject('Socket is not connected!'); }

          socket.put(url, payload, function(data, jwrs) {
            checkResponse(data, jwrs, resolve, reject);
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

