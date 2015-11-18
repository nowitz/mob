'user strict';
angular.module('app')
    .controller('RegistrationController', function ($scope, ModalService) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru menu.js
         */
        $scope.modalService = ModalService;



    });
