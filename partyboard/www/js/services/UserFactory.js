'user strict';
angular.module('app')
    .factory('UserFactory', function () {

        var user = {};

        user.isLoggedIn = false;

        user.loginType = null;
        user.loginTypeData = null;
        user.idUser = null;
        user.firstName = null;
        user.lastName = null;
        user.nick = null;
        user.email = null;
        user.phone = null;
        user.birthday = null;

        user.permissions = null;

        var obj = {};

        obj.logIn = function (idUser, firstName, lastName, nick, email, phone, birthday, loginType, loginTypeData, permissions) {
            if (!user.isLoggedIn) {
                user.isLoggedIn = true;

                user.idUser = idUser;
                user.firstName = firstName;
                user.lastName = lastName;
                user.nick = nick;
                user.email = email;
                user.phone = phone;
                user.birthday = birthday;
                user.loginType = loginType; //'facebook', 'google', 'account'
                user.loginTypeData = loginTypeData; //dalsi data napr ze socialnich siti id, age_range, locale, link atd
                user.permissions = permissions;
            }
        };
        obj.logOut = function () {
            user.isLoggedIn = false;

            user.loginType = null;
            user.loginTypeData = null;
            user.idUser = null;
            user.firstName = null;
            user.lastName = null;
            user.nick = null;
            user.email = null;
            user.phone = null;
            user.birthday = null;

            user.permissions = null;

            //smazani informaci o uctu
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userId');
        };
        obj.isLoggedIn = function () {
            return user.isLoggedIn;
        };

        obj.getLoginType = function () {
            return user.loginType;
        };

        obj.isPossibleChangePassword = function () {
            if (user.loginType === 'account')
                return true;

            return false;
        };

        obj.getLoginTypeData = function () {
            return user.loginTypeData;
        };

        obj.getIdUser = function () {
            return user.idUser;
        };

        obj.getFirstName = function () {
            return user.firstName;
        };

        obj.getLastName = function () {
            return user.lastName;
        };

        obj.getNick = function () {
            return user.nick;
        };

        obj.getEmail = function () {
            return user.email;
        };

        obj.getPhone = function () {
            return user.phone;
        };

        obj.getBirthday = function () {
            return user.birthday;
        };

        obj.getPermissions = function (){
            return user.permissions;
        }

        obj.getDataToServer = function () {
            return {idUser: obj.getIdUser(), firstName: obj.getFirstName(), lastName: obj.getLastName(), nick: obj.getNick(), email: obj.getEmail(), phone: obj.getPhone(), country: obj.getBirthday()};
        };

        return obj;
    });