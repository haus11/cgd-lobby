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
                    controller: function MainCtrl($scope) {
                        $scope.app = {
                            name: 'equilibrium',
                            description: 'An Angular-frontend-based Sails application'
                        };

                        
                        
                    },
                    templateUrl: 'app/main/main.html'
                });
        });
})(
    window.angular
);
