'user strict';
angular.module('app')
    .service('SendSMSService', function ($cordovaSms) {

        var device = {};
        device.options = {
            replaceLineBreaks: false, // true to replace \n by a new line, false by default
            android: {
                intent: 'INTENT'  // send SMS with the native android SMS messaging
            }};

        var obj = {};
        obj.init = function (phone, text) {
            $cordovaSms
                .send(phone, text, device.options)
                .then(function() {
                    //todo upravyt vypis po odeslani sms
                    alert("Success SMS");
                }, function(error) {
                    alert("Error SMS toast: "+error)
                });
        }
        return obj;
    });

