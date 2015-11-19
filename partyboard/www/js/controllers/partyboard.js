'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, ModalService) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru menu.js
         */
        $scope.modalService = ModalService;

        $scope.message = "";

        $scope.$watch(function () {
                return $scope.message;
            },
            function (newValue, oldValue) {
                if(newValue == oldValue){return;}
                //console.log(newValue);
                $scope.message = newValue;
            }, true);

        $scope.send = function(message){
            console.log(message);
            $scope.message = "";
        }

    });
