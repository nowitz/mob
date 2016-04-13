'user strict';
angular.module('app')
    .service('RestService', function ($http) {
        var url = {
            group_settings: "group_settings/",
            partyboards: "partyboards/"
        };

        var data;
        return {
            get: function(param){
                //console.log(param);
                return $http.get('http://students.kiv.zcu.cz:8088/~nowitz/'+url[param]).then(function(items) {
                    data = items.data;
                    return data;
                });
            }
        };
    });


        /*
        var url = {
            group_settings: "group_settings/",
            partyboards: "partyboards/"
        };

        var obj = {};

        obj.get = function (params, callback) {
            console.log(params);
            $http.get("http://students.kiv.zcu.cz:8088/~nowitz/"+url[params], {
                params: params
            }).success(function (data, status, headers, config, statusText) {
                //console.log(status);
                //console.log(headers(['content-type']))
                //console.log(data);
                typeof callback === 'function' && callback(data);
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


    });*/


