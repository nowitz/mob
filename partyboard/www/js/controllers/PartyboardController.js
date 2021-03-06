'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, ModalService, SendSMSService, ColorsFactory, UserFactory, SendInternetFactory) {

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
            console.log(SendInternetFactory.getTypeMessager());
            if(SendInternetFactory.getTypeMessager().key == "int"){
                alert("zprava z netu");
            }else if (SendInternetFactory.getTypeMessager().key == "sms"){
                SendSMSService.init(UserFactory.getPhone(),message);
                $scope.message = "";
            }else{
                //todo doresit vyherni sms
                alert("vyherni sms");
            }

        }


    });
