'user strict';
angular.module('app')
    .controller('SettingController', function ($scope, $ionicLoading, $translate, ColorsFactory, SendInternetFactory, SettingFactory, RestService) {

        $scope.userFactory = JSON.parse(localStorage.getItem('user'));
        $scope.setting = SettingFactory;

        /**
         * Seznam Partyboardu stazeny z DB
         * @type {null}
         */
        $scope.partyboards = null;

        //RestService.get("partyboards").then(function(data) {
        //    $scope.partyboards = data;
        //});

        $scope.$on("$ionicView.beforeEnter", function () {
            console.log($scope.setting.getPartyboard().id_partyboard);
            if ($scope.setting.getPartyboard().id_partyboard === null) {
                RestService.get("partyboards").then(function (data) {
                    console.log("stahuju partyboardy " + data);
                    $scope.partyboards = data;
                });
            }
        });
        //$scope.$on("$ionicView.enter", function () {
        //    console.log("cekam1");
        //});
        //$scope.$on("$ionicView.afterEnter", function () {
        //    console.log("cekam5");
        //});
        //$scope.$on("$ionicView.beforeLeave", function () {
        //    console.log("cekam4");
        //});
        //$scope.$on("$ionicView.leave", function () {
        //    console.log("cekam2");
        //});
        //$scope.$on("$ionicView.afterLeave", function () {
        //    console.log("cekam6");
        //});
        //
        //$scope.$on("$ionicView.unloaded", function () {
        //    console.log("cekam7");
        //});
        //$scope.$on("$ionicView.loaded", function () {
        //    console.log("cekam");
        //});


        /**
         * Prepinani jazyka
         * @type {*[]}
         */
        $scope.languages = [
            {name: 'English', shade: 'en'},
            {name: 'Česky', shade: 'cs'}
        ];
        if (localStorage.getItem("language") === "en") {
            $scope.language = $scope.languages[0];
        } else {
            $scope.language = $scope.languages[1];
        }
        $scope.changeLanguage = function (language) {
            $translate.use(language);
        }

        /**
         * Prepinani Partyboardu
         * @param partyboard
         */
        $scope.selectionPartyboard = function (partyboard) {
            if (partyboard !== null) {
                var tmp = {
                    id_partyboard: partyboard.id_partyboard,
                    name: partyboard.name,
                    sms_key: partyboard.sms_key
                }
                $scope.setting.setPartyboard(tmp);
            }
            //console.log( $scope.setting.getPartyboard());
        }


        /**
         * Nastaveni barvy
         */
        $scope.colors = ColorsFactory.all();
        $scope.color = $scope.colors[6];
        $scope.colorChange = function (rgb) {
            ColorsFactory.setRgbColor(rgb);
        }

        /**
         * Nastaveni typu zpravy
         */
        $scope.typeMessages = SendInternetFactory.all();
        $scope.typeMessage = $scope.typeMessages[0];

        $scope.selectionTypeMessage = function (typeMessage) {
            SendInternetFactory.setTypeMessage(typeMessage);
        }

    });
