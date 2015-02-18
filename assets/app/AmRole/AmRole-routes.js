(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/Amroles', '/Amroles/list');

            $stateProvider
                .state('Amroles', {
                    abstract: true,
                    url: '/Amroles',
                    controller: 'AmRoleCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        AmRoleDefinition : function getAmRoleDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('Amroles');
                        },
                        Amroles: function AmrolesListResolve(Restangular) {
                            return Restangular.all('Amroles').getList();
                        }
                    },
                })
                .state('Amroles.list', {
                    url: '/list',
                    templateUrl: 'app/AmRole/AmRole-list.html'
                })
                .state('Amroles.add', {
                    url: '/add',
                    templateUrl: 'app/AmRole/AmRole-add-edit.html'
                })
                .state('Amroles.info', {
                    url: '/info/:id',
                    controller: 'SingleAmRoleCtrl',
                    templateUrl: 'app/AmRole/AmRole-info.html'
                })
                .state('Amroles.edit', {
                    url: '/edit/:id',
                    controller: 'SingleAmRoleCtrl',
                    templateUrl: 'app/AmRole/AmRole-add-edit.html'
                });
        });
})(
    window.angular
);
