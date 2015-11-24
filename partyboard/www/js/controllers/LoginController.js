'user strict';
angular.module('app')
    .controller('LoginController', function ($scope, $ionicPopup, UserFactory, ModalService, NetworkServiceQ) {

        $scope.user = UserFactory;
        $scope.modalService = ModalService;

        $scope.loginData = {};

        //login
        $scope.doLogin = function () {
            /*
             Alert.show({loading: true});
             $http.post(SERVER_URL + "/login", {
             user: $scope.loginData,
             device: Device.getDataToServer()
             }, {timeout: SERVER_TIMEOUT})
             .success(function (data, status, header, config) {
             if (data.success) {
             UserFactory.logIn(data.user.firstName, data.user.lastName, data.user.gender, $scope.loginData.email, data.user.country, data.user.profilePicture, 'account', null);
             //ulozeni dat pro silent login
             localStorage.setItem('userEmail', $scope.loginData.email);
             localStorage.setItem('userId', data._id);

             ModalService.showProfile();
             ModalService.hideLogin();
             ModalService.hideChooseAccount();
             Alert.hide();

             $scope.loginData = {};

             } else
             Alert.show({msg: 'INVALID_EMAIL_OR_PASS', time: 3000});
             })
             .error(function (data, status, header, config) {
             Device.isOnline() ? Alert.show({
             msg: "AN_ERROR_CONNECTION",
             time: 3000
             }) : Alert.show({msg: "AN_ERROR_NOT_CONNECTED", time: 3000});
             });
             */
            UserFactory.logIn("jan", "novak", "male", "jan@novak.com", 728452510, "Czech Republic", 'account', null);
            ModalService.hideLogin();

            /**
             * Pokud nebude online tak me to nenecha skryt prihlaseni
             */
            /*
             if(NetworkService.checkOnline()){
             //TODO tady bude cele prihlaseni
             ModalService.hideLogin();
             }else{
             $ionicPopup.alert({
             title: 'Internet',
             template: '{{"connection" | translate}}'
             });
             }*/

        };

        $scope.logout = function () {
            delete($scope.loginData);
            ModalService.showLogin();
        }


        //forgot password
        $scope.forgotPassword = function () {
            var myPopup = null;
            $translate(['EMAIL_EXAMPLE', 'FORGOTPASSWORD_BUTTON', 'FORGOTPASSWORD_TEXT', 'EMAIL_EXAMPLE', 'CANCEL', 'SEND']).then(function (translation) {
                myPopup = $ionicPopup.show({
                    template: '<input class="popup-input" type="email" placeholder="' + translation.EMAIL_EXAMPLE + '" ng-model="loginData.email" ng-pattern="/^[_a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$/">',
                    title: translation.FORGOTPASSWORD_BUTTON,
                    subTitle: translation.FORGOTPASSWORD_TEXT,
                    scope: $scope,
                    buttons: [
                        {text: translation.CANCEL},
                        {
                            text: '<b>' + translation.SEND + '</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if (!$scope.loginData.email) {
                                    e.preventDefault();
                                } else {
                                    return $scope.loginData.email;
                                }
                            }
                        }
                    ]
                });
                myPopup.then(function (email) {
                    console.log(email);
                    if (email) {
                        Alert.show({loading: true});
                        $http.post(SERVER_URL + "/forgottenpassword", {email: email}, {timeout: SERVER_TIMEOUT})
                            .success(function (data, status, header, config) {
                                if (data.success)
                                    Alert.show({msg: 'NEW_PASSWORD_SENT', time: 3000}); //heslo se nemaze z loginData.email aby zustalo v Emailu pro prihlaseni
                                else
                                    Alert.show({msg: data.msg, time: 3000});
                            })
                            .error(function (data, status, header, config) {
                                Device.isOnline() ? Alert.show({
                                    msg: "AN_ERROR_CONNECTION",
                                    time: 3000
                                }) : Alert.show({msg: "AN_ERROR_NOT_CONNECTED", time: 3000});
                            });
                    }
                });
            });
        };
        var permisions = ["public_profile", "email", "user_friends"];
        $scope.loginFacebook = function () {
            facebookConnectPlugin.login(permisions, function (success) {
                console.log(success)//tady jsou info jako token atd
                obj.processFacebookData();
            });
        }

    });