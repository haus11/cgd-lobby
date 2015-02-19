(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/Eerestaurants', '/Eerestaurants/list');

            $stateProvider
                .state('Eerestaurants', {
                    abstract: true,
                    url: '/Eerestaurants',
                    controller: 'EERestaurantCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        EERestaurantDefinition : function getEERestaurantDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('Eerestaurants');
                        },
                        Eerestaurants: function EerestaurantsListResolve(Restangular) {
                            return Restangular.all('Eerestaurants').getList();
                        }
                    },
                })
                .state('Eerestaurants.list', {
                    url: '/list',
                    templateUrl: 'app/EERestaurant/EERestaurant-list.html'
                })
                .state('Eerestaurants.add', {
                    url: '/add',
                    templateUrl: 'app/EERestaurant/EERestaurant-add-edit.html'
                })
                .state('Eerestaurants.info', {
                    url: '/info/:id',
                    controller: 'SingleEERestaurantCtrl',
                    templateUrl: 'app/EERestaurant/EERestaurant-info.html'
                })
                .state('Eerestaurants.edit', {
                    url: '/edit/:id',
                    controller: 'SingleEERestaurantCtrl',
                    templateUrl: 'app/EERestaurant/EERestaurant-add-edit.html'
                });
        });
})(
    window.angular
);
