'user strict';
angular.module('app')
    .controller('LoginController', function ($scope, $ionicPopup, $state, $translate, UserFactory, ModalService, SettingFactory, NetworkService, RestService) {

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

            // UserFactory.logIn(1, "jan", "novak", "nowitz", "jan@novak.com", 736300202, "Czech Republic", 'account', null, {admin:true, noob:"test"});
            //$state.go('app.partyboard', {}, {reload: false});

            // ModalService.hideLogin();

            /**
             * Pokud nebude online tak me to nenecha skryt prihlaseni
             */

            if (NetworkService.checkOnline()) {
                //TODO kdyz localstorage nastavena tak zadnej dotaz a rovnou presmeruj - OVERIT PRES MOBIL V CONSOLE LG
                var logData = {
                    "email": $scope.loginData.email,
                    "password": CryptoJS.SHA1($scope.loginData.password).toString()
                };
                RestService.post("auth", logData).then(function (response) {
                    //console.log(response.headers());
                    if (response.status === 404) {
                        $translate('loginError').then(
                            function (translate) {//prelozeno
                                $ionicPopup.alert({
                                    title: translate,
                                    template: '{{"emailError" | translate}}'
                                });
                            });
                    } else if (response.status === 403) {
                        $translate('loginError').then(
                            function (translate) {//prelozeno
                                $ionicPopup.alert({
                                    title: translate,
                                    template: '{{"passwordError" | translate}}'
                                });
                            });
                    } else {
                        var user = response.data[0];
                        UserFactory.logIn(user.id_user, user.firstname, user.lastname, user.nick, user.email, user.phone, //.slice(5, 14)
                            user.birthdate, 'account', null, {
                                admin: true,
                                noob: "test"
                            }, response.headers("x-access-token"));
                        // console.log(UserFactory.getDataToServer());
                        $state.go('app.partyboard');
                    }
                });

            } else {
                $ionicPopup.alert({
                    title: 'Internet',
                    template: '{{"connection" | translate}}'
                });
            }

        };

        $scope.logout = function () {
            //odhlaseni pres facebook
            //facebookConnectPlugin.logout(function(){
            //    alert("Odhlaseni");
            //}, function(){
            //    alert("error - Odhlaseni")
            //});

            delete($scope.loginData);
            //delete(window.history);
            // console.log($ionicHistory.viewHistory());
            //console.log($ionicHistory.removeBackView());
            //console.log($ionicHistory.clearCache());
            //$ionicHistory.clearHistory();
            //$ionicViewService.clearHistory();
            //console.log($rootScope.$viewHistory.histories);
            $state.go('app.login', {}, {reload: true});
            SettingFactory.del();
            //console.log(SettingFactory.get());
            UserFactory.logOut();
        }


        //forgot password
        $scope.forgotPassword = function () {
            var myPopup = null;
            $translate(['emailExample', 'forgotPasswordButton', 'forgotPasswordText', 'cancel', 'send']).then(function (translation) {
                myPopup = $ionicPopup.show({
                    template: '<input class="popup-input" type="email" placeholder="' + translation.emailExample + '" ng-model="loginData.email" ng-pattern="/^[_a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,4})$/">',
                    title: translation.forgotPasswordButton,
                    subTitle: translation.forgotPasswordText,
                    scope: $scope,
                    buttons: [
                        {text: translation.cancel},
                        {
                            text: '<b>' + translation.send + '</b>',
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
                        //Alert.show({loading: true});
                        //$http.post(SERVER_URL + "/forgottenpassword", {email: email}, {timeout: SERVER_TIMEOUT})
                        //    .success(function (data, status, header, config) {
                        //        if (data.success)
                        //            Alert.show({msg: 'NEW_PASSWORD_SENT', time: 3000}); //heslo se nemaze z loginData.email aby zustalo v Emailu pro prihlaseni
                        //        else
                        //            Alert.show({msg: data.msg, time: 3000});
                        //    })
                        //    .error(function (data, status, header, config) {
                        //        Device.isOnline() ? Alert.show({
                        //            msg: "AN_ERROR_CONNECTION",
                        //            time: 3000
                        //        }) : Alert.show({msg: "AN_ERROR_NOT_CONNECTED", time: 3000});
                        //    });
                    }
                });
            });
        };

        // todo doresit prihlaseni uzivatele
        var permisions = ["public_profile", "email", "user_friends"];
        $scope.loginFacebook = function () {
            facebookConnectPlugin.login(permisions, function (success) {
                facebookConnectPlugin.api("/me?fields=id,first_name,last_name,age_range", permisions, function (data) {
                    ModalService.hideLogin();
                    alert(JSON.stringify(data));
                }, function (error) {
                    alert("error data - " + JSON.stringify(error));
                });
            }, function (error) {
                alert("login error - " + +JSON.stringify(error));
            });
        }
    });