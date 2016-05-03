'user strict';
angular.module('app')
    .service('RestService', function ($http) {
        var baseURL = 'http://students.kiv.zcu.cz:8088/~nowitz/';

        var url = {
            groupSettings: "group_settings",
            partyboards: "partyboards",
            towns: "towns",
            banUserPartyboard: "ban_user_partyboard",
            incommingMessages: "incomming_messages",
            users: "users",
            auth: "auth"
        };

        return {
            get: function (param) {
                //console.log(param);
                var headers = {'Content-Type': 'application/json'};
                if (param !== "auth" && param !== "users") {
                    //console.log(JSON.parse(localStorage.getItem('user')));
                    headers['X-Access-Token'] = JSON.parse(localStorage.getItem('user')).xAccessToken;
                }
                return $http.get(baseURL + url[param], {
                    headers: headers
                }).then(function (response) {
                    return response.data;
                });
            },
            post: function (param, obj) {
                //console.log(obj);
                var headers = {'Content-Type': 'application/json'};
                if (param !== "auth" && param !== "users") {
                    headers['X-Access-Token'] = JSON.parse(localStorage.getItem('user')).xAccessToken;
                }
                //  console.log(headers);
                return $http.post(baseURL + url[param], obj, {
                    headers: headers
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            put: function (param, obj) {
                //console.log(param);
                var headers = {'Content-Type': 'application/json'};
                if (param !== "auth" && param !== "users") {
                    headers['X-Access-Token'] = JSON.parse(localStorage.getItem('user')).xAccessToken;
                }
                // console.log(header);
                return $http.put(baseURL + url[param], obj, {
                    headers: headers
                }).then(function successCallback(response) {
                    return response;
                }, function errorCallback(response) {
                    return response;
                });
            },
            delete: function (param, id) {
                var headers = {'Content-Type': 'application/json'};
                if (param !== "auth" && param !== "users") {
                    headers['X-Access-Token'] = JSON.parse(localStorage.getItem('user')).xAccessToken;
                }
                return $http.delete(baseURL + url[param] + "/" + id, {
                    headers: headers
                }).then(function (response) {
                    return response;
                });
            }
        };
    });

