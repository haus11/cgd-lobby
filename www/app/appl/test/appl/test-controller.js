(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('Appl/testCtrl', Appl/testCtrl)
        .controller('SingleAppl/testCtrl', SingleAppl/testCtrl);

    function Appl/testCtrl($scope, $state, Appl/tests, Appl/testDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('appl/tests'.toLowerCase());
        
        $scope.appl/tests = Appl/tests;
        $scope.model_def = Appl/testDefinition.originalElement;
        $scope.appl/test = {};

        $scope.remove = function remove(appl/test) {
            appl/test = appl/test || $scope.appl/test;
            if (window.confirm('Are you sure you want to delete this appl/test?')) {
                return resourceService.remove(appl/test, $scope.appl/tests);
            }
        };

        $scope.save = function save(appl/test) {
            appl/test = appl/test || $scope.appl/test;
            return resourceService.save(appl/test, $scope.appl/tests)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleAppl/testCtrl($scope, $stateParams, Appl/tests, Appl/testDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.appl/test = _.find(Appl/tests, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
