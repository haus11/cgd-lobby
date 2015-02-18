(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('AmSessionCtrl', AmSessionCtrl)
        .controller('SingleAmSessionCtrl', SingleAmSessionCtrl);

    function AmSessionCtrl($scope, $state, Amsessions, AmSessionDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('Amsessions'.toLowerCase());
        
        $scope.Amsessions = Amsessions;
        $scope.model_def = AmSessionDefinition.originalElement;
        $scope.AmSession = {};

        $scope.remove = function remove(AmSession) {
            AmSession = AmSession || $scope.AmSession;
            if (window.confirm('Are you sure you want to delete this AmSession?')) {
                return resourceService.remove(AmSession, $scope.Amsessions);
            }
        };

        $scope.save = function save(AmSession) {
            AmSession = AmSession || $scope.AmSession;
            return resourceService.save(AmSession, $scope.Amsessions)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleAmSessionCtrl($scope, $stateParams, Amsessions, AmSessionDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.AmSession = _.find(Amsessions, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
