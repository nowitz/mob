'user strict';
angular.module('app')
    .factory('SendInternetFactory', function () {

        var typeMessages = [
            //TODO bude se natahodat z DB;
            {name: 'internet', key: 'int'},
            {name: 'sms', key: 'sms'}
            //{name: '5 sms win', key: '5smsWin'}
        ];

        var typeMessage = typeMessages[0];

        return {
            all: function () {
                return typeMessages;
            },
            setTypeMessage: function (tmp) {
                typeMessage = tmp;
            },
            getTypeMessager: function(){
                return typeMessage;
            }
        }
    });

