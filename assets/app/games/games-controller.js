(function(ng, _) {

    'use strict';

    ng.module('equilibrium')
        .controller('GamesCtrl', GamesCtrl)
        .controller('SingleGamesCtrl', SingleGamesCtrl);

    function GamesCtrl($scope, $state, Games, GamesDefinition, SailsResourceService) {
        var resourceService = new SailsResourceService('games'.toLowerCase());
        
        $scope.games = Games;
        $scope.model_def = GamesDefinition.originalElement;
        $scope.games = {};

        $scope.remove = function remove(games) {
            games = games || $scope.games;
            if (window.confirm('Are you sure you want to delete this games?')) {
                return resourceService.remove(games, $scope.games);
            }
        };

        $scope.save = function save(games) {
            games = games || $scope.games;
            return resourceService.save(games, $scope.games)
                .then(function() {
                    $state.go('^.list');
                }, function(err) {
                    console.error('An error occured: ' + err);
                });
        };
    }

    function SingleGamesCtrl($scope, $stateParams, Games, GamesDefinition) {
        // coerce string -> int
        $stateParams.id = _.parseInt($stateParams.id);
        if (!_.isNaN($stateParams.id)) {
            $scope.games = _.find(Games, {
                id: $stateParams.id
            });
        }
    }

})(
    window.angular,
    window._
);
