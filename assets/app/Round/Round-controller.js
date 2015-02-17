(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('RoundCtrl', RoundCtrl)
        .controller('SingleRoundCtrl', SingleRoundCtrl);

    function RoundCtrl($scope, $state, Rounds, RoundDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('Rounds'.toLowerCase());
        
        $scope.Rounds = Rounds;
        $scope.model_def = RoundDefinition.originalElement;
        $scope.Round = {};

        $scope.remove = function remove(Round) {
            Round = Round || $scope.Round;
            if (window.confirm('Are you sure you want to delete this Round?')) {
                return resourceService.remove(Round, $scope.Rounds);
            }
        };

        $scope.save = function save(Round) {
            Round = Round || $scope.Round;
            return resourceService.save(Round, $scope.Rounds)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleRoundCtrl($scope, $stateParams, Rounds, RoundDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.Round = _.find(Rounds, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
