// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova', 'pascalprecht.translate'])

    .run(function ($ionicPlatform, User, ModalService, NetworkService, $translate) {

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
            });

            /**
             * Vyskoci modalni okno pro prihlaseni
             */
            if (!User.isLoggedIn()) {
                ModalService.showLogin();
            }


        });
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
                templateUrl: 'templates/menu.html',
            })

            .state('app.partyboard', {
                url: '/partyboard',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/partyboard.html'
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

            .state('app.info', {
                url: '/info',
                views: {
                    'menuContent': {
                        templateUrl: 'templates/info.html'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/info');
    });
