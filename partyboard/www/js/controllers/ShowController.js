'user strict';
angular.module('app')
    .controller('ShowController', function ($scope, $state, BackButtonFactory) {

        $scope.hideGo = function (){
            BackButtonFactory.backButtonDisable();
            $state.go('app.setting');

        };

    });
