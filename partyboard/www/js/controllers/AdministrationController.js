'user strict';
angular.module('app')
    .controller('AdministrationController', function ($scope, $translate, ColorsFactory, SendInternetFactory, RestService, SettingFactory) {


        $scope.setting = SettingFactory;
        /**
         * Nastaveni barvy
         */
        $scope.colors = ColorsFactory.all();
        $scope.colorBack = null;
        $scope.colorText = null;


        //TODO opravit url
        $scope.$on("$ionicView.beforeEnter", function () {
            //console.log("administration", $scope.setting.getPartyboard().id_partyboard);
            if ($scope.setting.getPartyboard().id_partyboard !== null) {
                RestService.get("groupSettings","/"+$scope.setting.getPartyboard().id_partyboard).then(function (response) {
                    //console.log(response.data[0].settings);
                    angular.forEach(response.data[0].settings, function(value, key) {
                        ColorsFactory.getFindColor(value,$scope);
                        //console.log(key + ': ' + value.value, value.type_setting.name);
                        //if(value.type_setting.name === "background_color"){
                        //    $scope.colorBack = ColorsFactory.getFindColor(value.value);
                        //    console.log($scope.colorBack);
                        //}else if(value.type_setting.name === "text_color"){
                        //    $scope.colorText = ColorsFactory.getFindColor(value.value);
                        //    console.log($scope.colorText);
                        //}else if(value.type_setting.name === "text_size"){
                        //    console.log("text_size");
                        //}
                        //console.log("totate");
                    });
                });

                console.log($scope.colorBack, $scope.colorText);
            }
        });






        $scope.colorChangeText = function (rgb) {
            $scope.colorText = rgb;
            console.log("colorText", $scope.colorText);
        }

        $scope.colorChangeBackground = function (rgb) {
            $scope.colorBack = rgb;
            console.log("colorBack", $scope.colorBack);
        }



    });
