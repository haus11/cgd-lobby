(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/games', '/games/list');

            $stateProvider
                .state('games', {
                    abstract: true,
                    url: '/games',
                    controller: 'GamesCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        GamesDefinition : function getGamesDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('games');
                        },
                        Games: function gamesListResolve(Restangular) {
                            return Restangular.all('games').getList();
                        }
                    },
                })
                .state('games.list', {
                    url: '/list',
                    templateUrl: 'app/games/games-list.html'
                })
                .state('games.add', {
                    url: '/add',
                    templateUrl: 'app/games/games-add-edit.html'
                })
                .state('games.info', {
                    url: '/info/:id',
                    controller: 'SingleGamesCtrl',
                    templateUrl: 'app/games/games-info.html'
                })
                .state('games.edit', {
                    url: '/edit/:id',
                    controller: 'SingleGamesCtrl',
                    templateUrl: 'app/games/games-add-edit.html'
                });
        });
})(
    window.angular
);
