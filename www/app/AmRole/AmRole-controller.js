(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('AmRoleCtrl', AmRoleCtrl)
        .controller('SingleAmRoleCtrl', SingleAmRoleCtrl);

    function AmRoleCtrl($scope, $state, Amroles, AmRoleDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('Amroles'.toLowerCase());
        
        $scope.Amroles = Amroles;
        $scope.model_def = AmRoleDefinition.originalElement;
        $scope.AmRole = {};

        $scope.remove = function remove(AmRole) {
            AmRole = AmRole || $scope.AmRole;
            if (window.confirm('Are you sure you want to delete this AmRole?')) {
                return resourceService.remove(AmRole, $scope.Amroles);
            }
        };

        $scope.save = function save(AmRole) {
            AmRole = AmRole || $scope.AmRole;
            return resourceService.save(AmRole, $scope.Amroles)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleAmRoleCtrl($scope, $stateParams, Amroles, AmRoleDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.AmRole = _.find(Amroles, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
