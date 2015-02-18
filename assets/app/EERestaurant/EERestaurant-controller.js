(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('EERestaurantCtrl', EERestaurantCtrl)
        .controller('SingleEERestaurantCtrl', SingleEERestaurantCtrl);

    function EERestaurantCtrl($scope, $state, Eerestaurants, EERestaurantDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('Eerestaurants'.toLowerCase());
        
        $scope.Eerestaurants = Eerestaurants;
        $scope.model_def = EERestaurantDefinition.originalElement;
        $scope.EERestaurant = {};

        $scope.remove = function remove(EERestaurant) {
            EERestaurant = EERestaurant || $scope.EERestaurant;
            if (window.confirm('Are you sure you want to delete this EERestaurant?')) {
                return resourceService.remove(EERestaurant, $scope.Eerestaurants);
            }
        };

        $scope.save = function save(EERestaurant) {
            EERestaurant = EERestaurant || $scope.EERestaurant;
            return resourceService.save(EERestaurant, $scope.Eerestaurants)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleEERestaurantCtrl($scope, $stateParams, Eerestaurants, EERestaurantDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.EERestaurant = _.find(Eerestaurants, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
