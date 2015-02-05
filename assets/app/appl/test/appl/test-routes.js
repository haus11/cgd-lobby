(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/appl/tests', '/appl/tests/list');

            $stateProvider
                .state('appl/tests', {
                    abstract: true,
                    url: '/appl/tests',
                    controller: 'Appl/testCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        Appl/testDefinition : function getAppl/testDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('appl/tests');
                        },
                        Appl/tests: function appl/testsListResolve(Restangular) {
                            return Restangular.all('appl/tests').getList();
                        }
                    },
                })
                .state('appl/tests.list', {
                    url: '/list',
                    templateUrl: 'app/appl/test/appl/test-list.html'
                })
                .state('appl/tests.add', {
                    url: '/add',
                    templateUrl: 'app/appl/test/appl/test-add-edit.html'
                })
                .state('appl/tests.info', {
                    url: '/info/:id',
                    controller: 'SingleAppl/testCtrl',
                    templateUrl: 'app/appl/test/appl/test-info.html'
                })
                .state('appl/tests.edit', {
                    url: '/edit/:id',
                    controller: 'SingleAppl/testCtrl',
                    templateUrl: 'app/appl/test/appl/test-add-edit.html'
                });
        });
})(
    window.angular
);
