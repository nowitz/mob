'user strict';
angular.module('app')
    .controller('AdministrationController', function ($scope, $translate, ModalService, ColorsFactory, SendInternetFactory, RestService) {

        /**
         * Propisu si ModalService abych nemusel metody implementovat v kontroleru MenuController.js
         */
        $scope.modalService = ModalService;

        RestService.get("groupSettings", $scope,  function () {
            console.log($scope.result);
            $scope.groupSettings = $scope.result;
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
         * Vyber partyboardu
         * @type {*[]}
         */

        $scope.selectionPartyboard = function (partyboard) {
            console.log(partyboard);
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
