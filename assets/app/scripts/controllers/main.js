'use strict';

/**
 * @ngdoc function
 * @name equilibrium.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the equilibrium
 */
angular.module('equilibrium')
    .controller('MainCtrl', function ($scope, $rootScope, connectionService) {
        $scope.availableGames = [];


        connectionService.get('/api/server', {skip: 0, limit: 10}, function(data, jwres) {
            $scope.availableGames = data;
        });

        connectionService.on('server', function(data) {
            console.log(data);
            $scope.availableGames.push(data.data);
        });

        $rootScope.$on('server:connect', function() {

            // Create a new server for testing
            connectionService.post('/api/server', {game_id: 1, name: 'Cool Game', player_max: 20}, function(data, status) {
                console.log(status);

            });
        });
    });
