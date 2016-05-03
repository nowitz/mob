'user strict';
angular.module('app')
    .controller('SettingController', function ($scope, $state, $ionicLoading, $translate, ColorsFactory, SendInternetFactory, SettingFactory, RestService) {

        $scope.userFactory = JSON.parse(localStorage.getItem('user'));
        $scope.setting = SettingFactory;

        /**
         * Seznam Partyboardu stazeny z DB
         * @type {null}
         */
        $scope.partyboards = null;

        // PRIPRAVA TLACITKA PRO IPHONE NA BACK
        //$scope.doSomething = function(){
        //    console.log("jsemtu");
        //}

        $scope.$on("$ionicView.beforeEnter", function () {
            //console.log($scope.setting.getPartyboard().id_partyboard);
            if ($scope.setting.getPartyboard().id_partyboard === null) {
                RestService.get("partyboards","").then(function (response) {
                    //console.log("stahuju partyboardy " + data);
                    $scope.partyboards = response.data;
                });
            }
        });

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


                RestService.get("rolesUsersPartyboards","/"+$scope.userFactory.idUser+"/"+partyboard.id_partyboard).then(function (response) {
                    if(response.status === 200){
                        $scope.userFactory.permissions = response.data[0].roles_partyboard.permissions;
                        localStorage.setItem("user", JSON.stringify($scope.userFactory));
                    }else{
                        $scope.userFactory.permissions = null;
                        localStorage.setItem("user", JSON.stringify($scope.userFactory));
                    }
                    //REFRESHNE MI TO MENU !!! POUZIVAM TO PRO SKRYTI A ZOBRAZENI TLACITEK
                    $state.go('app.setting', {}, { reload: true, inherit: true, notify: true });
                });


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
