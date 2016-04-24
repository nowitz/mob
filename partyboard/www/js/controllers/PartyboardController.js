'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, $state, $timeout, $ionicLoading, ColorsFactory, ModalService, SendSMSService, UserFactory,
                                                  SendInternetFactory, MessageService, $ionicLoading, $translate, BanService, RestService,
                                                  $ionicScrollDelegate, SettingFactory) {

        $scope.setting = SettingFactory;
        $scope.colors = ColorsFactory;
        $scope.userFactory = UserFactory;

        /**
         * Pøenáší data do view
         * @type {{showAdministration: boolean, message: string}}
         */
        $scope.data = {
            showAdministration: true, // Nastaveni pro tlacitka administrace
            message: "" //Zprava z texboxu (obsah zpravy)
        };

        /**
         * Základni nastaveni pro stahovani zprav
         * @type {number}
         * @private
         */
        var _limit = 20;
        var params = {
            limit: _limit
            //offset: 0
        };

        /**
         * Formát struktury pro odeslaní právy
         * @type {{id_partyboard: null, key_word: null, nick: null, text: null}}
         */
        var sendData = {
            "id_partyboard": null,
            "id_user": null,
            "key_word": null,
            "nick": null,
            "text": null
        };

        /**
         * Uchovava vybranou zpravu z listu
         * @type {{}}
         */
        var objMessage = null;

        $scope.loadingHistory = false;

        $scope.$watch(function () {
                return $scope.data.message;
            },
            function (newValue, oldValue) {
                if (newValue == oldValue) {
                    return;
                }
                $scope.data.message = newValue;
            }, true);

        $scope.send = function (message) {
            //todo bude se tu nacitat mobilni cislo, message, atd..
            //console.log(SendInternetFactory.getTypeMessager());
            sendData.nick = UserFactory.getNick();
            sendData.text = message;
            if (SendInternetFactory.getTypeMessager().key == "int") {
                sendData.id_partyboard = $scope.setting.getPartyboard().id_partyboard;
                sendData.id_user = UserFactory.getIdUser();
                MessageService.sendMessage(sendData, $scope);
            } else if (SendInternetFactory.getTypeMessager().key == "sms") {
                sendData.key_word = $scope.setting.getPartyboard().sms_key;
                SendSMSService.init(UserFactory.getPhone(), sendData.key_word+" "+ sendData.nick+" "+message);
            } else {
                //todo doresit vyherni sms
                alert("vyherni sms");
            }
            $scope.data.message = "";
            //console.log(data);
        }

        //Promenna ktera mi zajisti to ze se mi to obnovi jenom jednou
        var unRepeater = true;

        //pred nactenim kontroleru se zavola takhle funkce a overi se zda je vybranej nejaky PB
        $scope.$on("$ionicView.beforeEnter", function () {
            if($scope.setting.getPartyboard().id_partyboard !== false){
                $scope.loadMore();
                if (unRepeater === true){
                    //$ionicHistory.clearHistory();
                   // $ionicHistory.clearCache();
                    $state.go('app.partyboard', {}, {reload: true});
                    unRepeater = false;
                }
            }
        });

        /**
         * Stáhne nejnovìjší zpravy
         */
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

        /**
         * Stahne historické zprávy
         * @param param
         */
        $scope.historyData = function(param){
            //console.log(param.gesture);
            if(param.gesture.direction == 'down' && params.limit < 100){
                params.limit = params.limit + 10;
                MessageService.loadBlogs(params, function () {
                    $scope.$broadcast("scroll.infiniteScrollComplete");
                }, $scope);
            }
        };


        /**
         * Skryje notifikaci
         */
        $scope.hide = function(){
            $ionicLoading.hide();
        };

        /**
         * Notifikace s výberem tlacitek
         * @param msg
         */
        $scope.administration = function(msg){
            //console.log(msg);
            console.log(UserFactory.getPermissions().admin);
            objMessage = msg;
            $ionicLoading.show({
                template: '<div >'+
                    '<button style="margin-right: 2ch" class="button button-energized" ng-click="setBan()">BAN</button>' +
                    '<button class="button button-assertive" ng-click="delMessage()">DEL</button>'+
                    '<button class="button button-clear loadingClose" ng-click="hide()"><i class="icon ion-close-circled"></i></button>'+
                '</div>',
                scope: $scope
            });
        };

        $scope.setBan = function(){
            var response = BanService.setBan(objMessage);
            console.log(response); //todo overit azbude namapovana tabulka users a banuser
        };

        /**
         * Slouži pro odstranìní zprávy
         */
        $scope.delMessage = function(){
            RestService.delete("incommingMessages",objMessage.id_incomming_message).then(function(response) {
                if(response.status == 200){
                    $ionicLoading.show({
                        template: '{{ "delMessage" | translate }}',
                        scope: $scope
                    });
                }else{
                    $ionicLoading.show({
                        template: '{{ "delErrorMessage" | translate }}',
                        scope: $scope
                    });
                }
                $timeout(function() {
                    $scope.hide();
                    $scope.loadMore();
                }, 2000);
            });

        };

    });
