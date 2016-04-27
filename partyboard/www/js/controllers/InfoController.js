'user strict';
angular.module('app')
    .controller('InfoController', function ($scope, ModalService, BackButtonFactory) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.modalService = ModalService;
        BackButtonFactory.backButtonCancel();


    });
