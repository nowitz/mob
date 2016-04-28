'user strict';
angular.module('app')
    .controller('MenuController', function ($scope, ModalService, UserFactory, NetworkService) {
        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.userFactory =  null;
        $scope.network = NetworkService;


        $scope.$on("$ionicView.beforeEnter", function () {
           // console.log("menu");
            if (localStorage.getItem('user') !== "login") {
                $scope.userFactory =  JSON.parse(localStorage.getItem('user'));
            }
        });

    });
