'user strict';
angular.module('app')
    .controller('AdministrationController', function ($scope, $translate, ColorsFactory, SendInternetFactory, RestService, SettingFactory) {


        $scope.setting = SettingFactory;
        /**
         * Nastaveni barvy
         */
        $scope.colors = ColorsFactory.all();
        //$scope.colorBack = null;
        //$scope.colorText = null;
        $scope.data = {
            colorBack: null,
            colorText: null,
            text_size: null
        };


        //TODO opravit url
        $scope.$on("$ionicView.beforeEnter", function () {
            //console.log("administration", $scope.setting.getPartyboard().id_partyboard);
            if ($scope.setting.getPartyboard().id_partyboard !== null) {
                RestService.get("groupSettings","/?active=true&partyboard="+$scope.setting.getPartyboard().id_partyboard).then(function (response) {
                    //console.log(response.data[0].settings);
                    angular.forEach(response.data[0].settings, function(value, key) {
                        ColorsFactory.getFindColor(value,$scope);
                        //console.log(key + ': ' + value.value, value.type_setting.name);
                        if(value.type_setting.name === "text_size"){
                            $scope.data.text_size = value.value;
                            console.log("text_size",$scope.data.text_size);
                        }
                    });
                });
            }
        });




        $scope.colorChangeText = function (rgb) {
            $scope.data.colorText = rgb;
            console.log("colorText", $scope.data.colorText);
        }

        $scope.colorChangeBackground = function (rgb) {
            $scope.data.colorBack = rgb;
            console.log("colorBack", $scope.data.colorBack);
        }



    });
