'user strict';
angular.module('app')
    .controller('AdministrationController', function ($scope, $q, $translate, $ionicLoading, $ionicPopup, ColorsFactory, SendInternetFactory, RestService, SettingFactory) {


        $scope.setting = SettingFactory;
        /**
         * Nastaveni barvy
         */
        $scope.colors = ColorsFactory.all();

        $scope.data = {
            idGroupSetting: null,

            colorBack: {idTypeSetting: null, value: null, idSetting: null},
            colorText: {idTypeSetting: null, value: null, idSetting: null},
            textSize: {idTypeSetting: null, value: null, idSetting: null}
        };

        $scope.sizes = [
            {id: 0, size: "12"},
            {id: 1, size: "16"},
            {id: 2, size: "20"},
            {id: 3, size: "24"},
            {id: 4, size: "28"},
            {id: 5, size: "32"},
            {id: 6, size: "36"},
            {id: 7, size: "40"}
        ];

        $scope.$on("$ionicView.beforeEnter", function () {
            if ($scope.setting.getPartyboard().id_partyboard !== null) {
                RestService.get("groupSettings", "/?active=true&partyboard=" + $scope.setting.getPartyboard().id_partyboard).then(function (response) {
                    //console.log(response);
                    if (response.status === -1) {
                        $translate('error').then(
                            function (translate) {
                                $ionicPopup.alert({
                                    title: translate,
                                    template: '{{"serverDisconnect" | translate}}'
                                });
                            });
                    } else {
                        $scope.data.idGroupSetting = response.data[0].id_group_setting;
                        angular.forEach(response.data[0].settings, function (value, key) {
                            ColorsFactory.getFindColor(value, $scope);

                            if (value.type_setting.name === "text_size") {
                                //console.log(value);
                                angular.forEach($scope.sizes, function (size, key) {
                                    if (size.size === value.value) {
                                        $scope.data.textSize.value = size;
                                        $scope.data.textSize.idTypeSetting = value.type_setting.id_type_setting;
                                        $scope.data.textSize.idSetting = value.id_setting;
                                    }
                                });
                                //console.log("text_size",$scope.data.textSize);
                            }

                        });
                    }
                });
            }
        });


        $scope.changeTextSize = function (size) {
            $scope.data.textSize.value = size;
            //console.log("textSize", $scope.data.textSize.value);
        };

        $scope.colorChangeText = function (rgb) {
            $scope.data.colorText.value = rgb;
            //console.log("colorText", $scope.data.colorText.value);
        };

        $scope.colorChangeBackground = function (rgb) {
            $scope.data.colorBack.value = rgb;
            //console.log("colorBack", $scope.data.colorBack.value);
        };


        $scope.sendSettings = function () {
            var requests = [];
            var status = 0;

            //BACKGROUND COLOR
            var param = {
                "id_group_setting": $scope.data.idGroupSetting,
                "id_type_setting": $scope.data.colorBack.idTypeSetting,
                "value": $scope.data.colorBack.value.color
            }
            var deferred1 = $q.defer();
            requests.push(deferred1.promise);
            RestService.put("settings", $scope.data.colorBack.idSetting, param).then(function (response) {
                if (response.status === 200) {
                    status = status + 1;
                }
                deferred1.resolve();
            });

            //TEXT COLOR
            var param = {
                "id_group_setting": $scope.data.idGroupSetting,
                "id_type_setting": $scope.data.colorText.idTypeSetting,
                "value": $scope.data.colorText.value.color
            }
            var deferred2 = $q.defer();
            requests.push(deferred2.promise);
            RestService.put("settings", $scope.data.colorText.idSetting, param).then(function (response) {
                if (response.status === 200) {
                    status = status + 1;
                }
                deferred2.resolve();
            });

            //TEXT SIZE
            var param = {
                "id_group_setting": $scope.data.idGroupSetting,
                "id_type_setting": $scope.data.textSize.idTypeSetting,
                "value": $scope.data.textSize.value.size
            }
            var deferred3 = $q.defer();
            requests.push(deferred3.promise);
            RestService.put("settings", $scope.data.textSize.idSetting, param).then(function (response) {
                if (response.status === 200) {
                    status = status + 1;
                }
                deferred3.resolve();
            });

            $q.all(requests).then(function () {
                if (status === 3) {
                    $ionicLoading.show({
                        template: '{{ "settingPartyboard" | translate }}',
                        duration: 1500,
                        scope: $scope
                    });
                } else {
                    $ionicLoading.show({
                        template: '{{ "settingErrorPartyboard" | translate }}',
                        duration: 1500,
                        scope: $scope
                    });
                }
            });
        };


    });
