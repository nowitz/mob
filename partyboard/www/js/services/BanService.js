'user strict';
angular.module('app')
    .service('BanService', function (RestService) {


        var obj = {};
        /**
         * Nastav� ban u�ivateli
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

        /**
         * Zru�� ban u�ivateli
        */
        obj.cancelBan = function (obj) {
            //return device.isOnline;
        };
        return obj;
    });

