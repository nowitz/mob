'user strict';
angular.module('app')
    .service('BanService', function (RestService) {


        var obj = {};
        /**
         * Nastav� ban u�ivateli
         */
        obj.setBan = function (msg, data) {
            //console.log(msg);
            var obj = {
                "id_partyboard": msg.id_partyboard,
                "phone": msg.phone,
                "id_user": msg.id_user,
                "length_hour": data.timeSelected.hour,
                "description": data.text
            };
            console.log("Struktura pro ban",obj);
            //TODO vyzkou�et...az bude namapovana tabulka s banama
            //RestService.post("bunUserPartyboard",obj).then(function(data) {
            //   console.log(data);
            //   return data;
            //});
        };

        /**
         * Zru�� ban u�ivateli
        */
        obj.cancelBan = function (obj) {
            //return device.isOnline;
        };
        return obj;
    });

