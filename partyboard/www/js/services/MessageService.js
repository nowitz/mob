'user strict';
angular.module('app')
    .service('MessageService', function ($http) {

        var baseURL = 'http://students.kiv.zcu.cz:8088/~nowitz/';
        /**
         * Service pro obslouzeni incomming messages (p��choz� zpr�vy)
         */

        var obj = {};

        obj.loadBlogs = function (params, idPartyboard,callback, $scope) {
            //console.log(params);
            $http.get(baseURL+"incomming_messages/"+idPartyboard, { // http://private-23397-partyboard.apiary-mock.com/v1/messages/board/1/?count=6 https://public-api.wordpress.com/rest/v1/freshly-pressed/
                params: params,
                headers: {'Content-Type': 'application/json',
                    'X-Access-Token': JSON.parse(localStorage.getItem('user')).xAccessToken}
            }).success(function (data, status, headers, config, statusText) {
                //console.log(status);
                //console.log(headers(['content-type']))
                //console.log(config);
               // console.log(data);
                $scope.result = data;
                typeof callback === 'function' && callback(); //test jestli se jedna o funkci

            }).error(function (data, status, headers, config) {
                //console.log(status);
                if(status == 404){
                    console.log(headers(['X-Error']));
                }
            });
        }

        obj.sendMessage = function (data, $scope){
            console.log(data);
            $http.post(baseURL+"incomming_messages/", data,{
                headers: {'Content-Type': 'application/json',
                    'X-Access-Token': JSON.parse(localStorage.getItem('user')).xAccessToken}
            }).success(function (result) {
                console.log(result); //TODO overit az bude namapovana tabulka users
                $scope.loadMore();
            });
        };

        return obj;
    });


