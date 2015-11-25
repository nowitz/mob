'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, ModalService, SendSMSService, ColorsFactory, UserFactory, SendInternetFactory, MessageService, $ionicLoading, $translate) {

        $scope.message = "";
        $scope.colors = ColorsFactory;


        $scope.$watch(function () {
                return $scope.message;
            },
            function (newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }
                $scope.message = newValue;
            }, true);

        $scope.send = function (message) {
            //todo bude se tu nacitat mobilni cislo, message, atd..
            console.log(SendInternetFactory.getTypeMessager());
            if (SendInternetFactory.getTypeMessager().key == "int") {
                alert("zprava z netu");
            } else if (SendInternetFactory.getTypeMessager().key == "sms") {
                SendSMSService.init(UserFactory.getPhone(), message);
                $scope.message = "";
            } else {
                //todo doresit vyherni sms
                alert("vyherni sms");
            }
        }

        $scope.messages = [];
        $scope.params = {};

        // todo opravit udalost kdy se maji nacitat data
        /*
         $scope.a = function () {
             $translate('loadMessage').then(
                function (translate) {//prelozeno
                $ionicLoading.show({template: translate});
             });
             MessageService.loadBlogs();
         };
         */

        $scope.loadMore = function () {
            MessageService.loadBlogs();
        }


        $scope.$on("messages", function (_, result) {
            result.forEach(function (b) {
                $scope.messages.push({
                    nick: b.nick,
                    message: b.message
                });
            });
            //$ionicLoading.hide();
            $scope.$broadcast("scroll.infiniteScrollComplete");
        });

    });
