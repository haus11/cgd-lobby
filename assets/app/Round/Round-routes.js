(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/Rounds', '/Rounds/list');

            $stateProvider
                .state('Rounds', {
                    abstract: true,
                    url: '/Rounds',
                    controller: 'RoundCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        RoundDefinition : function getRoundDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('Rounds');
                        },
                        Rounds: function RoundsListResolve(Restangular) {
                            return Restangular.all('Rounds').getList();
                        }
                    },
                })
                .state('Rounds.list', {
                    url: '/list',
                    templateUrl: 'app/Round/Round-list.html'
                })
                .state('Rounds.add', {
                    url: '/add',
                    templateUrl: 'app/Round/Round-add-edit.html'
                })
                .state('Rounds.info', {
                    url: '/info/:id',
                    controller: 'SingleRoundCtrl',
                    templateUrl: 'app/Round/Round-info.html'
                })
                .state('Rounds.edit', {
                    url: '/edit/:id',
                    controller: 'SingleRoundCtrl',
                    templateUrl: 'app/Round/Round-add-edit.html'
                });
        });
})(
    window.angular
);
