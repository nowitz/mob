'user strict';
angular.module('app')
    .service('RestService', function ($http) {
        var url = {
            groupSettings: "group_settings/",
            partyboards: "partyboards/",
            towns:"towns/",
            bunUserPartyboard:"ban_user_partyboard/",
            incommingMessages:"incomming_messages/"
        };

        return {
            get: function(param){
                //console.log(param);
                return $http.get('http://students.kiv.zcu.cz:8088/~nowitz/'+url[param]).then(function(response) {
                    return response.data;
                });
            },
            post: function(param, obj) {
                console.log(obj);
                return $http.post('http://students.kiv.zcu.cz:8088/~nowitz/' + url[param], obj,{
                    headers: {'Content-Type': 'application/json'}
                }).then(function (response) {
                    console.log(response);
                    return response.data;;
                });

                //return $http({
                //    method: "POST",
                //    url: 'http://students.kiv.zcu.cz:8088/~nowitz/' + url[param]
                //}).then(function (response) {
                //    console.log(response)
                //    data = response.data;
                //    return data;
                //});

            },
            delete: function(param, id) {
                return $http.delete('http://students.kiv.zcu.cz:8088/~nowitz/' + url[param]+id).then(function (response) {
                    return response;
                });
            }
        };
    });


        /*
        var url = {
            groupSettings: "groupSettings/",
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


