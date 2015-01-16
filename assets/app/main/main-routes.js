(function(ng) {
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/', '/main')
                .when('', '/main');

            $stateProvider
                .state('main', {
                    url: '/main',
                    controller: function MainCtrl($scope, $sails) {
                        $scope.app = {
                            name: 'equilibrium',
                            description: 'An Angular-frontend-based Sails application'
                        };
                        
                        $sails.get("/games").success(function (data) {
                          console.log(data);
                        }).error(function (data) {
                            alert('Houston, we got a problem!');
                        });
                    },
                    templateUrl: 'app/main/main.html'
                });
        });
})(
    window.angular
);
