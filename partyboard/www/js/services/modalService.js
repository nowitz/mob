'user strict';
angular.module('app')
    .service('ModalService', function ($ionicModal) {
        this.showLogin = function () {
            var service = this;
            if (service.loginModal) {
                service.loginModal.show();
            } else {
                $ionicModal.fromTemplateUrl('templates/login.html', {
                    scope: null
                }).then(function (modal) {
                    service.loginModal = modal;
                    service.loginModal.show();
                });
            }
        };
        this.hideLogin = function () {
            this.loginModal && this.loginModal.hide();
        };
    });