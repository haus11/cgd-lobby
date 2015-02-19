(function(ng) {
    
    'use strict';

    ng.module('equilibrium')
        .config(function($stateProvider, $urlRouterProvider) {

            $urlRouterProvider
                .when('/Offers', '/Offers/list');

            $stateProvider
                .state('Offers', {
                    abstract: true,
                    url: '/Offers',
                    controller: 'OfferCtrl',
                    template: '<div ui-view></div>',
                    resolve: {
                        OfferDefinition : function getOfferDefinition (SailsResourceDefinitions) {
                            return SailsResourceDefinitions.get('Offers');
                        },
                        Offers: function OffersListResolve(Restangular) {
                            return Restangular.all('Offers').getList();
                        }
                    },
                })
                .state('Offers.list', {
                    url: '/list',
                    templateUrl: 'app/Offer/Offer-list.html'
                })
                .state('Offers.add', {
                    url: '/add',
                    templateUrl: 'app/Offer/Offer-add-edit.html'
                })
                .state('Offers.info', {
                    url: '/info/:id',
                    controller: 'SingleOfferCtrl',
                    templateUrl: 'app/Offer/Offer-info.html'
                })
                .state('Offers.edit', {
                    url: '/edit/:id',
                    controller: 'SingleOfferCtrl',
                    templateUrl: 'app/Offer/Offer-add-edit.html'
                });
        });
})(
    window.angular
);
