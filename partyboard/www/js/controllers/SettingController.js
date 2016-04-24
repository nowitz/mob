'user strict';
angular.module('app')
    .controller('SettingController', function ($scope, $translate, ModalService, ColorsFactory, SendInternetFactory, SettingFactory, RestService, UserFactory) {

        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.modalService = ModalService;
        $scope.userFactory = UserFactory;

        $scope.setting = SettingFactory;

        /**
         * Seznam Partyboardu stazeny z DB
         * @type {null}
         */
        $scope.partyboards = null;

        RestService.get("partyboards").then(function(data) {
            $scope.partyboards = data;
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
            var tmp = {
                id_partyboard: partyboard.id_partyboard,
                name: partyboard.name,
                sms_key: partyboard.sms_key
            }
            $scope.setting.setPartyboard(tmp);
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

        $scope.selectionTypeMessage = function(typeMessage){
            SendInternetFactory.setTypeMessage(typeMessage);
        }

    });
