'user strict';
angular.module('app')
    .factory('BackButtonFactory', function ($state, $ionicPlatform, $ionicHistory, $timeout) {
// VOLA SE PAK TAKHLE    backcallFactory.backcallfun();
        var obj = {}
        obj.backButtonCancel = function () {
            //var backbutton=0;
            $ionicPlatform.registerBackButtonAction(function () {
                if ($state.current.name == "app.partyboard" || $state.current.name == "app.login") {

                    /**
                     * Mostno pro doubleclick na zavreni aplikace

                     if(backbutton==0){
                        backbutton++;
                        window.plugins.toast.showShortCenter('Press again to exit');
                        $timeout(function(){backbutton=0;},5000);
                    }else{
                        navigator.app.exitApp();
                    }
                     */

                    /*
                     * Moznost pro dialogovy okno s tim jestli chci zavrit aplikaci
                     */
                    var action = confirm("Do you want to Exit?");
                    if (action) {
                        navigator.app.exitApp();
                    }

                } else {
                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });
                    $state.go('app.partyboard');
                    //go to home page
                }
            }, 100);//registerBackButton
        }//backcallfun

        /**
         * Zakaze tlacitko zpet
         */
        obj.backButtonProhibited = function () {
            $ionicPlatform.registerBackButtonAction(function (e) {
                e.preventDefault();
            }, 1000);

        };

        /**
         * Skryje sipku v navigaci po presmerovani
         */
        obj.backButtonDisable = function (){
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
        };

        return obj;
    });