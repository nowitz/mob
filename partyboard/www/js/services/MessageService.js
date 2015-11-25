'user strict';
angular.module('app')
    .service('MessageService', function ($http, $rootScope) {
        var obj = {};

        obj.loadBlogs = function (params) {
            $http.get("http://private-23397-partyboard.apiary-mock.com/v1/messages/board/1/5", { // https://public-api.wordpress.com/rest/v1/freshly-pressed/
                params: params
            }).success(function (result) {
                // console.log(result);
                $rootScope.$broadcast("messages", result); //Messages - nazev ktery mi aktivuje funkci   $scope.$on("messages", function (_, result) {....
            });
        }
        return obj;
    });
