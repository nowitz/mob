'user strict';
angular.module('app')
    .service('MessageService', function ($http) {
        var obj = {};

        obj.loadBlogs = function (params, callback, $scope) {
            //console.log(params);
            $http.get("http://students.kiv.zcu.cz:8088/~nowitz/incomming_messages/", { // http://private-23397-partyboard.apiary-mock.com/v1/messages/board/1/?count=6 https://public-api.wordpress.com/rest/v1/freshly-pressed/
                params: params
            }).success(function (result) {
                //console.log(result);
                $scope.result = result;
                typeof callback === 'function' && callback(); //test jestli se jedna o funkci
            });
        }


        obj.sendMessage = function (data, $scope){
            $http.post("http://students.kiv.zcu.cz:8088/~nowitz/incomming_messages/", data,{
                headers: {'Content-Type': 'application/json'}
            }).success(function (result) {
                $scope.loadMore();
            });
        };
            /*
            var headers = {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : 'POST, GET, OPTIONS, PUT, DELETE',
                //'Content-Type': 'application/json',
                //'Accept': 'application/json',
                'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Key'
            };
           // var url = "http://private-23397-partyboard.apiary-mock.com/v1/messages/board/1/?count=6";
            var url = "http://students.kiv.zcu.cz:8088/~nowitz/towns";
            $http({
                method: 'GET',
                url: url,
                headers:headers
            }).
                success(function(result) {
                    $scope.result = result;
                    console.log( result.data);
                    typeof callback === 'function' && callback();
                }).
                error(function(status) {
                    //your code when fails
                });
                */


        return obj;
    });


