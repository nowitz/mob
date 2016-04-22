'user strict';
angular.module('app')
    .factory('UserFactory', function () {

        var user = {};

        user.isLoggedIn = false;

        user.loginType = null;
        user.loginTypeData = null;
        user.firstName = null;
        user.lastName = null;
        user.nick = null;
        user.email = null;
        user.phone = null;
        user.country = null;
        //user.profilePicture = null;

        user.myScore = null;

        var obj = {};

        obj.logIn = function (firstName, lastName, nick, email, phone, country, loginType, loginTypeData) { //profilePicture
            if (!user.isLoggedIn) {
                user.isLoggedIn = true;


                user.firstName = firstName;
                user.lastName = lastName;
                user.nick = nick; //
                user.email = email;
                user.phone = phone;
                user.country = country; //zkratka z service -> flags
               // user.profilePicture = profilePicture; //url
                user.loginType = loginType; //'facebook', 'google', 'account'
                user.loginTypeData = loginTypeData; //dalsi data napr ze socialnich siti id, age_range, locale, link atd
            }
        };
        obj.logOut = function () {
            user.isLoggedIn = false;

            user.loginType = null;
            user.loginTypeData = null;
            user.firstName = null;
            user.lastName = null;
            user.nick = null;
            user.email = null;
            user.phone = null;
            user.country = null;
           // user.profilePicture = null;
            user.myScore = null;

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

        obj.getCountry = function () {
            return user.country;
        };
/*
        obj.setProfilePicture = function (profilePicture) { //potreba protoze na fb se profile picture dostane az dyl
            user.profilePicture = profilePicture;
        };
        obj.getProfilePicture = function () {
            return user.profilePicture ? user.profilePicture : 'img/profile-pic-default.png';
        };*/

        obj.getDataToServer = function () {
            return {firstName: obj.getFirstName(), lastName: obj.getLastName(), nick: obj.getnick(), email: obj.getEmail(), phone: obj.getPhone(), country: obj.getCountry()};// profilePicture: obj.getProfilePicture()
        };

        obj.getMyScore = function () {
            return user.myScore;
        };

        return obj;
    });