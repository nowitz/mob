'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, ModalService, SendSMSService, ColorsFactory, UserFactory) {

        $scope.message = "";

        $scope.colors = ColorsFactory;

        $scope.$watch(function () {
                return $scope.message;
            },
            function (newValue, oldValue) {
                if(newValue == oldValue){return;}
                $scope.message = newValue;
            }, true);

        $scope.send = function(message){
            //todo bude se tu nacitat mobilni cislo, message, atd..
            alert("jsem tu");
            SendSMSService.init(UserFactory.getPhone(),message); //UserFactory.getPhone()
            $scope.message = "";
        }


    });
