(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/Eesurveys', '/Eesurveys/list');

            $stateProvider
                .state('Eesurveys', {
                    abstract: true,
                    url: '/Eesurveys',
                    controller: 'EESurveyCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        EESurveyDefinition : function getEESurveyDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('Eesurveys');
                        },
                        Eesurveys: function EesurveysListResolve(Restangular) {
                            return Restangular.all('Eesurveys').getList();
                        }
                    },
                })
                .state('Eesurveys.list', {
                    url: '/list',
                    templateUrl: 'app/EESurvey/EESurvey-list.html'
                })
                .state('Eesurveys.add', {
                    url: '/add',
                    templateUrl: 'app/EESurvey/EESurvey-add-edit.html'
                })
                .state('Eesurveys.info', {
                    url: '/info/:id',
                    controller: 'SingleEESurveyCtrl',
                    templateUrl: 'app/EESurvey/EESurvey-info.html'
                })
                .state('Eesurveys.edit', {
                    url: '/edit/:id',
                    controller: 'SingleEESurveyCtrl',
                    templateUrl: 'app/EESurvey/EESurvey-add-edit.html'
                });
        });
})(
    window.angular
);
