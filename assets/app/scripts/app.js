'use strict';

/**
 * @ngdoc overview
 * @name equilibrium
 * @description
 * # equilibrium
 *
 * Main module of the application.
 */
angular
    .module('equilibrium', [
        'ngAnimate',
        'ngResource',
        'ngRoute'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'app/views/main.html',
                controller: 'MainCtrl'
            })
            .when('/creategame', {
                templateUrl: 'app/views/creategame.html',
                controller: 'CreategameCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
