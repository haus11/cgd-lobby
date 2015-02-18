(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('OfferCtrl', OfferCtrl)
        .controller('SingleOfferCtrl', SingleOfferCtrl);

    function OfferCtrl($scope, $state, Offers, OfferDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('Offers'.toLowerCase());
        
        $scope.Offers = Offers;
        $scope.model_def = OfferDefinition.originalElement;
        $scope.Offer = {};

        $scope.remove = function remove(Offer) {
            Offer = Offer || $scope.Offer;
            if (window.confirm('Are you sure you want to delete this Offer?')) {
                return resourceService.remove(Offer, $scope.Offers);
            }
        };

        $scope.save = function save(Offer) {
            Offer = Offer || $scope.Offer;
            return resourceService.save(Offer, $scope.Offers)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleOfferCtrl($scope, $stateParams, Offers, OfferDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.Offer = _.find(Offers, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
