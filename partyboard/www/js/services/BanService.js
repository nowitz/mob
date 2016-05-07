'user strict';
angular.module('app')
    .service('BanService', function (RestService) {


        var obj = {};
        /**
         * Nastaví ban uživateli
         */
        obj.setBan = function (msg, data, callback) {
            var obj = {
                "id_partyboard": msg.id_partyboard,
                "phone": msg.phone,
                "id_user": msg.id_user,
                "length_hour": data.timeSelected.hour,
                "description": data.text
            };
            RestService.post("banUserPartyboard",obj).then(function(data) {
              // console.log(data);
                typeof callback === 'function' &&  callback(data.status);
            });
        };


        obj.getBan = function ($scope,id){
            RestService.get("banUserPartyboard","/partyboard/"+id).then(function (response) {
       //         console.log(response.data);
                $scope.items = response.data;
            });
        };

        /**
         * Zruší ban uživateli
        */
        obj.unBan = function (id,data, callback) {
            var obj = {
                "id_partyboard": data.partyboards.id_partyboard,
                "phone": data.phone,
                "id_user": data.users.id_user,
                "length_hour": data.length_hour,
                "ongoing": false,
                "description": data.description
            };
            RestService.put("banUserPartyboard",id, obj).then(function (response) {
                //console.log(response);
                typeof callback === 'function' &&  callback(response.status);
            });
        };
        return obj;
    });

