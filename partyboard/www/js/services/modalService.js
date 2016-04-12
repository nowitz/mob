'user strict';
angular.module('app')
    .service('ModalService', function ($ionicModal, $state) {

        /**
         * Login
         */
        this.showLogin = function () {
            var service = this;
            if (service.loginModal) {
                service.loginModal.show();
            } else {
                $ionicModal.fromTemplateUrl('templates/login.html', {
                    scope: null,
                    animation: 'no-animation'
                }).then(function (modal) {
                    service.loginModal = modal;
                    service.loginModal.show();
                });
            }
        };
        this.hideLogin = function () {
            this.loginModal && this.loginModal.hide();
        };

        /**
         * Setting
         */
        this.showSetting = function () {
            var service = this;
            if (service.settingModal) {
                service.settingModal.show();
            } else {
                $ionicModal.fromTemplateUrl('templates/setting.html', {
                    scope: null
                }).then(function (modal) {
                    service.settingModal = modal;
                    service.settingModal.show();
                });
            }
        };
        this.hideSetting = function () {
            this.settingModal && this.settingModal.hide();
            $state.go($state.current, {}, {reload: true});
        };

        /**
         * Info
         */
        this.showInfo = function () {
            var service = this;
            if (service.infoModal) {
                service.infoModal.show();
            } else {
                $ionicModal.fromTemplateUrl('templates/info.html', {
                    scope: null
                }).then(function (modal) {
                    service.infoModal = modal;
                    service.infoModal.show();
                });
            }
        };
        this.hideInfo = function () {
            this.infoModal && this.infoModal.hide();
        };

        /**
         * Registration
         */
        this.showRegistration = function () {
            var service = this;
            if (service.registrationModal) {
                service.registrationModal.show();
            } else {
                $ionicModal.fromTemplateUrl('templates/registration.html', {
                    scope: null
                }).then(function (modal) {
                    service.registrationModal = modal;
                    service.registrationModal.show();
                });
            }
        };

        this.hideRegistration = function () {
            this.registrationModal && this.registrationModal.hide();
        };

        /**
         * Administrace
         */
        this.showAdministration = function(){
            var service = this;
            if (service.administrationModal) {
                service.administrationModal.show();
            } else {
                $ionicModal.fromTemplateUrl('templates/administration.html', {
                    scope: null
                }).then(function (modal) {
                    service.administrationModal = modal;
                    service.administrationModal.show();
                });
            }
        };

        this.hideAdministration = function () {
            this.administrationModal && this.administrationModal.hide();
        };

    });