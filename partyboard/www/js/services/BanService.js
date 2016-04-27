'user strict';
angular.module('app')
    .service('BanService', function (RestService) {


        var obj = {};
        /**
         * Nastaví ban uživateli
         */
        obj.setBan = function (msg) {
            //console.log(msg);
            var obj = {
                "id_partyboard": msg.id_partyboard,
                "phone": msg.phone,
                "id_user": msg.id_user,
                "length_hour": 24,
                "description": "Zablokování odesílaní zpráv z dùvodu neslušného chování."
            };
            console.log("Struktura pro ban",obj);
            //TODO vyzkoušet...az bude namapovana tabulka s banama
            //RestService.post("bunUserPartyboard",obj).then(function(data) {
            //   console.log(data);
            //   return data;
            //});
        };

        /**
         * Zruší ban uživateli
        */
        obj.cancelBan = function (obj) {
            //return device.isOnline;
        };
        return obj;
    });

