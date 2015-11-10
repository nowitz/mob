'user strict';
angular.module('app')
    .factory('User', function () {

        var user = {};

        user.isLoggedIn = false;

        user.loginType = null;
        user.loginTypeData = null;
        user.firstName = null;
        user.lastName = null;
        user.gender = null;
        user.email = null;
        user.country = null;
        //user.profilePicture = null;

        user.myScore = null;

        var obj = {};

        obj.logIn = function (firstName, lastName, gender, email, country, profilePicture, loginType, loginTypeData) {
            if (!user.isLoggedIn) {
                user.isLoggedIn = true;


                user.firstName = firstName;
                user.lastName = lastName;
                user.gender = gender; //'male' nebo 'female'
                user.email = email;
                user.country = country; //zkratka z service -> flags
                user.profilePicture = profilePicture; //url
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
            user.gender = null;
            user.email = null;
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

        obj.getGender = function () {
            return user.gender;
        };

        obj.getEmail = function () {
            return user.email;
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
            return {firstName: obj.getFirstName(), lastName: obj.getLastName(), gender: obj.getGender(), email: obj.getEmail(), country: obj.getCountry()};// profilePicture: obj.getProfilePicture()
        };

        obj.getMyScore = function () {
            return user.myScore;
        };

        return obj;
    });