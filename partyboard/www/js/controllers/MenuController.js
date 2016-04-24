'user strict';
angular.module('app')
    .controller('MenuController', function ($scope, ModalService, UserFactory) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.modalService = ModalService;
        $scope.userFactory =  UserFactory;

    });
