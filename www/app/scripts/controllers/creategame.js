'use strict';

/**
 * @ngdoc function
 * @name assetsApp.controller:CreategameCtrl
 * @description
 * # CreategameCtrl
 * Controller of the assetsApp
 */
angular.module('equilibrium')
  .controller('CreategameCtrl', function ($scope, connectionService, dataService) {

    $scope.modules = dataService.getModules();


    $scope.createDummyServer = function () {
      connectionService.post('/game', { secret: 'applemarket', name: 'The apple market' })
        .then(function(data) {
          console.log(data);
        })
        .catch(function(reason) {
          console.log(reason);
        });
    }
  });
