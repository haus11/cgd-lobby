'use strict';

/**
 * @ngdoc function
 * @name equilibrium.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the equilibrium
 */
angular.module('equilibrium')
    .controller('MainCtrl', function ($scope, connectionService) {
        connectionService.get('/api/server', {skip: 0, limit: 10}, function(data, jwres) {
            console.log('get' + data);
            console.log('get' + jwres);
        });

        connectionService.on('server', function(data) {
            console.log('on' + data);
        });
    });
