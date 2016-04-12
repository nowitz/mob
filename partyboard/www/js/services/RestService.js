'user strict';
angular.module('app')
    .service('RestService', function ($http) {

        var url = {
            group_settings: "group_settings/"
        };

        var obj = {};

        obj.get = function (params, $scope, callback) {
            console.log(params);
            $http.get("http://students.kiv.zcu.cz:8088/~nowitz/"+url[params], {
                params: params
            }).success(function (data, status, headers, config, statusText) {
                //console.log(status);
                //console.log(headers(['content-type']))
                //console.log(data);
                $scope.result = data;
                typeof callback === 'function' && callback();
            });
        }


        obj.post = function (data, $scope){
            $http.post("http://students.kiv.zcu.cz:8088/~nowitz/"+url[params], data,{
                headers: {'Content-Type': 'application/json'}
            }).success(function (result) {
                console.log(result);
                $scope.loadMore();
            });
        };


        return obj;
    });


