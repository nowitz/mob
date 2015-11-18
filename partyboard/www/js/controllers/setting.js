'user strict';
angular.module('app')
    .controller('SettingController', function ($scope, $translate) {

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

        $scope.partyboards = [
            //TODO bude se natahodat z DB;
            {name: 'McFabrika', shade: 'mcfabrika'},
            {name: 'Duplex', shade: 'duplex'}
        ]

        $scope.selectionPartyboard = function (partyboard) {
            console.log(partyboard);
        }

        $scope.nickChange = function(nick){
            console.log(nick);
        }



    });
