'user strict';
angular.module('app')
    .service('BanService', function (RestService) {


        var obj = {};
        /**
         * Nastav� ban u�ivateli
         */
        obj.setBan = function (msg) {
            //console.log(msg);
            var obj = {
                "id_partyboard": msg.id_partyboard,
                "phone": msg.id_phone,
                "id_user": msg.id_user,
                "length_hour": 24,
                "description": "Zablokov�n� odes�lan� zpr�v z d�vodu neslu�n�ho chov�n�."
            };
            console.log(obj);
            //TODO vyzkou�et...
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

