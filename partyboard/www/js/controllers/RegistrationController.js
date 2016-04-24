'user strict';
angular.module('app')
    .controller('RegistrationController', function ($scope, $ionicLoading, ModalService, RestService) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.modalService = ModalService;

        /**
         * Skryje notifikaci
         */
        $scope.hide = function(){
            $ionicLoading.hide();
        };

        /**
         * Seznam mest stazeny z DB
         * @type {null}
         */
        $scope.towns = null;

        RestService.get("towns").then(function(data) {
            //console.log(data);
            $scope.towns = data;
        });

        $scope.registerData = {};
        $scope.doRegister = function() {
            //console.log($scope.registerData); //todo doresit hlasku pri registraci
            $ionicLoading.show({
                template: '<div ng-click="hide()" >'+$scope.hide+'</div>',
               // duration:300,
                scope: $scope
            });
            $scope.registerData = null;
        };

        //if(NetworkService.checkOnline()){
        //    //console.log($scope.registerData); //todo doresit hlasku pri registraci
        //    $ionicLoading.show({
        //        template: '<div ng-click="hide()" >'+'prihlaseni'+'</div>',
        //        duration:3000,
        //        scope: $scope
        //    });
        //    $scope.registerData = null;
        //}else {
        //    $ionicPopup.alert({
        //        title: 'Internet',
        //        template: '{{"connection" | translate}}'
        //    });
        //}

    });
