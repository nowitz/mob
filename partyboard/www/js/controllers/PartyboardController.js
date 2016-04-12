'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, $state, ColorsFactory, ModalService, SendSMSService, UserFactory, SendInternetFactory, MessageService, $ionicLoading, $translate, $ionicScrollDelegate, SettingFactory) {

        $scope.setting = SettingFactory;
        $scope.colors = ColorsFactory;

        $scope.message = "";

        var _limit = 20;
        var params = {
            limit: _limit
            //offset: 0
        };

        var data = {
            "id_partyboard": 1,
            "phone": "00420752365214",
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

        //Promenna ktera mi zajisti to ze se mi to obnovi jenom jednou
        var unRepeater = true;

        $scope.$on("$ionicView.beforeEnter", function () { //pred nactenim kontroleru se zavola takhle funkce a overi se zda je vybranej nejaky PB
            if($scope.setting.getPartyboard().id_partyboard !== false){
                $scope.loadMore();
                if (unRepeater === true){
                   // delete(window.history);
                    $state.go('app.partyboard', {}, {reload: true});
                    unRepeater = false;
                }
            }
        });


        $scope.loadMore = function () {
            console.log(params.limit);
            $scope.loadingHistory = true;
            MessageService.loadBlogs(params, function () {
                $scope.$broadcast("scroll.infiniteScrollComplete");
                $scope.loadingHistory = false;
                params.limit = _limit;
                $ionicScrollDelegate.scrollBottom(); //soupnu list dolu
            }, $scope);

        };


        $scope.historyData = function(){
            var scrollTop = $ionicScrollDelegate.getScrollPosition().top;
            //console.log("top: "+scrollTop);
            if(scrollTop <= 0){
                params.limit = params.limit + 10;
                MessageService.loadBlogs(params, function () {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                    $scope.loadingHistory = false;
                }, $scope);
            }
        };
    });
