'user strict';
angular.module('app')
    .service('RestService', function ($http) {
        var url = {
            groupSettings: "group_settings",
            partyboards: "partyboards",
            towns:"towns",
            bunUserPartyboard:"ban_user_partyboard",
            incommingMessages:"incomming_messages",
            users:"users",
            auth:"auth"
        };

        return {
            get: function(param){
                //console.log(param);
                var headers = {'Content-Type': 'application/json'};
                if(param !== "auth" && param !== "users"){
                    //console.log(JSON.parse(localStorage.getItem('user')));
                    headers['X-Access-Token'] = JSON.parse(localStorage.getItem('user')).xAccessToken;
                }
                return $http.get('http://students.kiv.zcu.cz:8088/~nowitz/'+url[param],{
                    headers: headers
                }).then(function(response) {
                    return response.data;
                });
            },
            post: function(param, obj) {
                //console.log(param);
                var headers = {'Content-Type': 'application/json'};
                if(param !== "auth" && param !== "users"){
                    headers['X-Access-Token'] = JSON.parse(localStorage.getItem('user')).xAccessToken;
                }
               // console.log(header);
                return $http.post('http://students.kiv.zcu.cz:8088/~nowitz/' + url[param], obj,{
                    headers: headers
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            delete: function(param, id) {
                var headers = {'Content-Type': 'application/json'};
                if(param !== "auth" && param !== "users"){
                    headers['X-Access-Token'] = JSON.parse(localStorage.getItem('user')).xAccessToken;
                }
                return $http.delete('http://students.kiv.zcu.cz:8088/~nowitz/' + url[param]+"/"+id,{
                    headers: headers
                }).then(function (response) {
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


