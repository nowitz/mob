'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, ModalService, SendSMSService, ColorsFactory, UserFactory, SendInternetFactory, MessageService, $ionicLoading, $translate, $ionicScrollDelegate) {

        $scope.message = "";
        $scope.colors = ColorsFactory;

        var _limit = 20;
        var params = {
            limit: _limit
            //offset: 0
        };

        var data = {
            "id_partyboard": 1,
            "phone": 752365214,
            "nick": "Honza",
            "text": "Ahoj lidi jak se mate?"
        };

        $scope.loadingHistory = false;

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
                //alert("zprava z netu");
                data.text = message;
                MessageService.sendMessage(data, $scope);
                $scope.message = "";
            } else if (SendInternetFactory.getTypeMessager().key == "sms") {
                SendSMSService.init(UserFactory.getPhone(), message);
                $scope.message = "";
            } else {
                //todo doresit vyherni sms
                alert("vyherni sms");
            }
        }

        $scope.$on("$ionicView.beforeEnter", function () { //pred nactenim kontroleru se zavola takhle funkce
            $scope.loadMore();
        });

        $scope.loadMore = function () {
            //console.log(params.limit);
            $scope.loadingHistory = true;
            MessageService.loadBlogs(params, function () {
                $scope.$broadcast("scroll.infiniteScrollComplete");
                $scope.loadingHistory = false;
                params.limit = _limit;
                $ionicScrollDelegate.scrollBottom(); //soupnu list dolu
            }, $scope);

        };

        $scope.doRefresh = function(){
            params.limit = params.limit + 10;
            MessageService.loadBlogs(params, function () {
                $scope.$broadcast("scroll.infiniteScrollComplete");
                $scope.loadingHistory = false;
            }, $scope);
        };

    });
