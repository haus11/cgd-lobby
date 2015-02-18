(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/Amsessions', '/Amsessions/list');

            $stateProvider
                .state('Amsessions', {
                    abstract: true,
                    url: '/Amsessions',
                    controller: 'AmSessionCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        AmSessionDefinition : function getAmSessionDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('Amsessions');
                        },
                        Amsessions: function AmsessionsListResolve(Restangular) {
                            return Restangular.all('Amsessions').getList();
                        }
                    },
                })
                .state('Amsessions.list', {
                    url: '/list',
                    templateUrl: 'app/AmSession/AmSession-list.html'
                })
                .state('Amsessions.add', {
                    url: '/add',
                    templateUrl: 'app/AmSession/AmSession-add-edit.html'
                })
                .state('Amsessions.info', {
                    url: '/info/:id',
                    controller: 'SingleAmSessionCtrl',
                    templateUrl: 'app/AmSession/AmSession-info.html'
                })
                .state('Amsessions.edit', {
                    url: '/edit/:id',
                    controller: 'SingleAmSessionCtrl',
                    templateUrl: 'app/AmSession/AmSession-add-edit.html'
                });
        });
})(
    window.angular
);
