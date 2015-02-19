(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('EESurveyCtrl', EESurveyCtrl)
        .controller('SingleEESurveyCtrl', SingleEESurveyCtrl);

    function EESurveyCtrl($scope, $state, Eesurveys, EESurveyDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('Eesurveys'.toLowerCase());
        
        $scope.Eesurveys = Eesurveys;
        $scope.model_def = EESurveyDefinition.originalElement;
        $scope.EESurvey = {};

        $scope.remove = function remove(EESurvey) {
            EESurvey = EESurvey || $scope.EESurvey;
            if (window.confirm('Are you sure you want to delete this EESurvey?')) {
                return resourceService.remove(EESurvey, $scope.Eesurveys);
            }
        };

        $scope.save = function save(EESurvey) {
            EESurvey = EESurvey || $scope.EESurvey;
            return resourceService.save(EESurvey, $scope.Eesurveys)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleEESurveyCtrl($scope, $stateParams, Eesurveys, EESurveyDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.EESurvey = _.find(Eesurveys, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
