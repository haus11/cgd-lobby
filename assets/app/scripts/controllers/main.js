'use strict';

/**
 * @ngdoc function
 * @name equilibrium.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the equilibrium
 */
angular.module('equilibrium')
    .controller('MainCtrl', function ($document, $scope, $rootScope, connectionService, dataService) {
        $scope.availableGames = dataService.getAvailableGames();

        $scope.generateGameUrl = function(game) {
          return dataService.getGameUrl(game.module, game.id);
        };


        connectionService.on('connect', function() {
          connectionService.get('/games', null)
            .then(function (data) {
              for (var indexOfGame = 0; indexOfGame < data.length; indexOfGame++)
              {
                if (data[indexOfGame].started === false)
                {
                  dataService.addGame(data[indexOfGame]);
                }
              }
            })
            .catch(function(reason) {
              console.log(reason);
          });
        });


        connectionService.on('game', function(data) {
          if (data.verb === 'created')
          {
           dataService.addGame(data.data);
          }
          else if (data.verb === 'destroyed')
          {
            dataService.removeGame(data.data.id);
          }
        });
    });
