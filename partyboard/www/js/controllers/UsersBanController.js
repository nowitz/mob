'user strict';
angular.module('app')
    .controller('UsersBanController', function ($scope) {

        $scope.data = {
            showDelete: false
        };

        $scope.unBan = function(item) {
            alert('Share Item: ' + item.id_user);
        };

        $scope.items = [
            { id: 0, id_user: 1 },
            { id: 1, id_user: 1 },
            { id: 2, id_user: 1 },
            { id: 3, id_user: 1 },
            { id: 4, id_user: 1 },
            { id: 5, id_user: 1 },
            { id: 6, id_user: 1 },
            { id: 7, id_user: 1 },
            { id: 8, id_user: 1 },
            { id: 9, id_user: 1 },
            { id: 10, id_user: 1 }
        ];

    });
