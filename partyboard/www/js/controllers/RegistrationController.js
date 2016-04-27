'user strict';
angular.module('app')
    .controller('RegistrationController', function ($scope, $ionicLoading, $ionicPopup, ModalService, RestService, NetworkService) {
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
        //$scope.towns = null;
        //
        //RestService.get("towns").then(function(data) {
        //    //console.log(data);
        //    $scope.towns = data;
        //});

        $scope.registerData = {};
        $scope.doRegister = function() {

            if(NetworkService.checkOnline()){
                /***/
                if($scope.registerData.password != $scope.registerData.checkPassword){
                    $ionicLoading.show({
                        template: '{{ "errorPassword" | translate }}',
                        duration:1500,
                        scope: $scope
                    });
                }else{
                    var data = {
                        id_role_account:1,
                        id_facebook: null,
                        birthdate: $scope.registerData.birthday.toISOString(),
                        password: CryptoJS.SHA1($scope.registerData.password).toString(),
                        nick: $scope.registerData.nick,
                        firstname: $scope.registerData.firstName,
                        lastname: $scope.registerData.lastName,
                        email: $scope.registerData.email,
                        phone: "00000"+$scope.registerData.phone
                    };

                    RestService.post("users", data).then(function(response) {
                       // console.log(response.headers("x-error-type"));
                        if(response.status === 409){
                            $ionicLoading.show({
                                template: response.headers("x-error-type")==="nick"?'{{ "errorNick" | translate }}':'{{ "errorEmail" | translate }}',
                                duration:3000,
                                scope: $scope
                            });
                        }else{
                            $scope.registerData = {};
                            $scope.modalService.hideRegistration();
                            $ionicLoading.show({
                                template: '{{ "registrationOK" | translate }}',
                                duration:3000,
                                scope: $scope
                            });
                        }
                    });
                }
                /***/
            }else {
                //$ionicLoading.show({
                //    template: '<span class="z-index:50000;">{{"connection" | translate}}</span>',
                //    duration:2000,
                //    scope: $scope
                //});
                $ionicPopup.alert({
                    title: 'Internet',
                    template: '<span class="z-index:10000;">{{"connection" | translate}}</span>'
                });
            }
        };

    });
