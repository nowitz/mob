'user strict';
angular.module('app')
    .controller('RegistrationController', function ($scope, ModalService, RestService) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.modalService = ModalService;

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
            //console.log($scope.registerData);
            alert($scope.registerData);
            $scope.registerData = null;
        };


    });
