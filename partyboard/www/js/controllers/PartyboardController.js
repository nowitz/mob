'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, $state, $ionicLoading, ColorsFactory, ModalService, SendSMSService, UserFactory,
                                                  SendInternetFactory, MessageService, $ionicLoading, $translate,
                                                  $ionicScrollDelegate, SettingFactory) {

        $scope.setting = SettingFactory;
        $scope.colors = ColorsFactory;

        $scope.message = "";

        var _limit = 20;
        var params = {
            limit: _limit
            //offset: 0
        };

        var data = {
            "id_partyboard": null,
            //"phone": $scope.setting.,
            "key_word": null,
            "nick": null,
            "text": null
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
            data.nick = "honza";
            data.text = message;
            if (SendInternetFactory.getTypeMessager().key == "int") {
                data.id_partyboard = $scope.setting.getPartyboard().id_partyboard;
                MessageService.sendMessage(data, $scope);
            } else if (SendInternetFactory.getTypeMessager().key == "sms") {
                data.key_word = $scope.setting.getPartyboard().sms_key;
                SendSMSService.init(UserFactory.getPhone(), data.key_word+" "+ data.nick+" "+message);
            } else {
                //todo doresit vyherni sms
                alert("vyherni sms");
            }
            $scope.message = "";
            //console.log(data);
        }

        //Promenna ktera mi zajisti to ze se mi to obnovi jenom jednou
        var unRepeater = true;

        $scope.$on("$ionicView.beforeEnter", function () { //pred nactenim kontroleru se zavola takhle funkce a overi se zda je vybranej nejaky PB
            if($scope.setting.getPartyboard().id_partyboard !== false){
                $scope.loadMore();
                if (unRepeater === true){
                    //delete(window.history);
                    //$ionicHistory.clearHistory();
                   // $ionicHistory.clearCache();
                    $state.go('app.partyboard', {}, {reload: true});
                    unRepeater = false;
                }
            }
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


        $scope.historyData = function(param){
            //console.log(param.gesture);
           // console.log(params.limit);
            if(param.gesture.direction == 'down' && params.limit < 100){
                params.limit = params.limit + 10;
                MessageService.loadBlogs(params, function () {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                }, $scope);
            }
        };


        $scope.data = {
            showDelete: false
        };

        /**
         * Skryje notifikaci
         */
        $scope.hide = function(){
            $ionicLoading.hide();
        };

        /**
         * Masazi zprav
         * @param msg
         */
        $scope.delete = function(msg){
            console.log(msg);
            $ionicLoading.show({
                template: '<div ng-click="hide()" >'+
                '<button style="margin-right: 2ch" class="button button-energized">BAN</button>' +
                '<button class="button button-assertive">DEL </button>'+
                '</div>',
                // duration:300,
                scope: $scope
            });
        };
    });
