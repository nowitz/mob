'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, ModalService, SendSMSService) {

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
            //todo bude se tu nacitat mobilni cislo, message, atd..
            SendSMSService.init('728452510',message);
            $scope.message = "";
        }

    });
