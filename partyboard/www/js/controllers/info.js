'user strict';
angular.module('app')
    .controller('InfoController', function ($scope, ModalService) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru menu.js
         */
        $scope.modalService = ModalService;



    });
