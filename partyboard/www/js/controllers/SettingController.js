'user strict';
angular.module('app')
    .controller('SettingController', function ($scope, $translate, ModalService, ColorsFactory, SendInternetFactory, SettingFactory, RestService) {

        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.modalService = ModalService;

        $scope.setting = SettingFactory;

        $scope.partyboards = null;

        RestService.get("partyboards").then(function(data) {
            $scope.partyboards = data;
        });

/*
        RestService.get("partyboards",  function (data) {
            alert(data[0].id_partyboard);
            //todo tady musi byt if kterej urci do ktery scope se to ma poslat
            $scope.partyboards = data;
        });*/


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


        $scope.selectionPartyboard = function (partyboard) {
            var tmp = {
                id_partyboard: partyboard.id_partyboard,
                name: partyboard.name,
                sms_key: partyboard.sms_key
            }
            $scope.setting.setPartyboard(tmp);
            console.log("vypis stazenyho PB");
            console.log( $scope.setting.getPartyboard());
        }

        /**
         * Uchovani prezdivky pro odesilani zprav
         * @param nick
         */
        $scope.nickChange = function (nick) {
            console.log(nick);
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
