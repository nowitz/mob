// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'pascalprecht.translate'])

    .run(function ($ionicPlatform, UserFactory, ModalService, NetworkService, $translate, $state) {

        /**
         * Zjisti mi to jazyk prohlizece a nastavi mi podle toho aplikaci
         */
        var language = localStorage.getItem('language') === null ? (navigator.language || navigator.userLanguage).split("-")[0] : localStorage.getItem('language');
        $translate.use(language);
        localStorage.setItem("language", language);

        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            document.addEventListener("deviceready", function () {
                /**
                 * Inicialzace Networkservice
                 */
                NetworkService.init();
            },false);


            /**
             * Vyskoci modalni okno pro prihlaseni
             */
            console.log(localStorage.getItem('user') === null);
            console.log(localStorage.getItem('user') );
            if(localStorage.getItem('user') !== null) {
                $state.go('app.setting'); //,{}, {reload: false}
           }


        });

        /**
         * ZAREHISTROVANI UDALOSTI NA TLACITKO BACK
         */
        //$ionicPlatform.registerBackButtonAction(function(e) {
        //    e.preventDefault();
        //}, 1000);

    })

    .config(function ($stateProvider, $urlRouterProvider, $translateProvider) {
        /**
         * Slouzi pri prepinani jazyku
         */
        $translateProvider.translations('en', english);
        $translateProvider.translations('cs', czech);
        $translateProvider.preferredLanguage("en");
        $translateProvider.fallbackLanguage("en");

        $stateProvider

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html'
            })

            .state('app.partyboard', {
                url: '/partyboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/partyboard.html'
                    }
                }
            })

            .state('app.administration', {
                url: '/administration',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/administration.html'
                    }
                }
            })

            .state('app.info', {
                url: '/info',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/info.html'
                    }
                }
            })

            .state('app.setting', {
                url: '/setting',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/setting.html'
                    }
                }
            })
            .state('app.login', {
                url: '/login',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/login.html'
                    }
                }
            })


        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/partyboard');
    });
