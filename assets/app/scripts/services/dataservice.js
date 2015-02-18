'use strict';

/**
 * @ngdoc service
 * @name assetsApp.dataService
 * @description
 * # connectionService
 * Service in the assetsApp.
 */
angular.module('equilibrium')
  .service('dataService', function () {
    var availableGames = [];
    var modules = {
      apple: {
        name: 'Applemarket',
        url:  'http://localhost:1338/#'//'http://192.168.0.198:9000/#/' //
      },

      exitEntry: {
        name: 'Exit & Entry',
        url: 'http://localhost:9000/#/'
      }
    };

    // -----------------------------------------------------------------------------
    // Public api of the connection service
    // -----------------------------------------------------------------------------
    return {
      addGame: function(game) {
        availableGames.push(game);
      },

      removeGame: function(doomedGameId) {
        for(var indexOfGame = 0; indexOfGame < availableGames.length; indexOfGame++)
        {
          if (availableGames[indexOfGame].id === doomedGameId)
          {
            availableGames.splice(indexOfGame, 1);
          }
        }
      },

      getAvailableGames: function() {
       return availableGames;
      },

      getModules: function() {
        return modules;
      },

      getGameUrl: function(module, gameId) {
        return modules[module.name].url + 'join/' + gameId;
      }
    };
  });

