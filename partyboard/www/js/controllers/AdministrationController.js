'user strict';
angular.module('app')
    .controller('AdministrationController', function ($scope, $translate, $ionicLoading, ColorsFactory, SendInternetFactory, RestService, SettingFactory) {


        $scope.setting = SettingFactory;
        /**
         * Nastaveni barvy
         */
        $scope.colors = ColorsFactory.all();

        $scope.data = {
            idGroupSetting: null,

            colorBack:{idTypeSetting: null, value: null, idSetting:null},
            colorText:{idTypeSetting: null, value: null, idSetting:null},
            textSize:{idTypeSetting: null, value: null, idSetting:null}
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
            //BACKGROUND COLOR
            var param = {
                "id_group_setting": $scope.data.idGroupSetting,
                "id_type_setting": $scope.data.colorBack.idTypeSetting,
                "value": $scope.data.colorBack.value.color
            }
            var status = 0;
            RestService.put("settings",$scope.data.colorBack.idSetting, param).then(function (response) {
                if(response.status === 200){
                    status = status + 1;
                }
            });
            //TEXT COLOR
            var param = {
                "id_group_setting": $scope.data.idGroupSetting,
                "id_type_setting": $scope.data.colorText.idTypeSetting,
                "value": $scope.data.colorText.value.color
            }
            console.log(param);
            RestService.put("settings",$scope.data.colorText.idSetting, param).then(function (response) {
                if(response.status === 200){
                    status = status + 1;
                }
            });
            //TEXT SIZE
            var param = {
                "id_group_setting": $scope.data.idGroupSetting,
                "id_type_setting": $scope.data.textSize.idTypeSetting,
                "value": $scope.data.textSize.value.size
            }
            RestService.put("settings",$scope.data.textSize.idSetting, param).then(function (response) {
                if(response.status === 200){
                    status = status + 1;
                }
            });
            //TODO doresit asynchrone ... bach prosel if
            console.log(status, status === 3);
            if(status === 3){
                $ionicLoading.show({
                    template: '{{ "settingPartyboard" | translate }}',
                    duration: 1500,
                    scope: $scope
                });
            }else{
                $ionicLoading.show({
                    template: '{{ "settingErrorPartyboard" | translate }}',
                    duration: 1500,
                    scope: $scope
                });
            }
        };


    });
