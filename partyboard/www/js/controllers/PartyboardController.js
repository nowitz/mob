'user strict';
angular.module('app')
    .controller('PartyboardController', function ($scope, $state, $timeout, $ionicLoading, ColorsFactory, ModalService, SendSMSService, UserFactory,
                                                  SendInternetFactory, MessageService, $ionicLoading, $translate, BanService, RestService,
                                                  $ionicScrollDelegate, SettingFactory, BackButtonFactory) {

        $scope.setting = SettingFactory;
        $scope.colors = ColorsFactory;
        $scope.userFactory = null;
        BackButtonFactory.backButtonCancel();

        /**
         * P�en�� data do view
         * @type {{showAdministration: boolean, message: string}}
         */
        $scope.data = {
            showAdministration: true, // Nastaveni pro tlacitka administrace
            message: "" //Zprava z texboxu (obsah zpravy)
        };

        /**
         * Z�kladni nastaveni pro stahovani zprav
         * @type {number}
         * @private
         */
        var _limit = 20;
        var params = {
            limit: _limit
            //offset: 0
        };

        /**
         * Form�t struktury pro odeslan� pr�vy
         * @type {{id_partyboard: null, key_word: null, nick: null, text: null}}
         */
        var sendData = {
            "id_partyboard": null,
            "id_user": null,
            "phone": null,
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
            //console.log($scope.userFactory);
            sendData.nick = $scope.userFactory.nick;
            sendData.text = message;
            sendData.phone = $scope.userFactory.phone;
            if (SendInternetFactory.getTypeMessager().key == "int") {
                sendData.id_partyboard = $scope.setting.getPartyboard().id_partyboard;
                sendData.id_user = $scope.userFactory.idUser;
                //console.log($scope.userFactory.idUser);
                MessageService.sendMessage(sendData, $scope);
            } else if (SendInternetFactory.getTypeMessager().key == "sms") {
                sendData.key_word = $scope.setting.getPartyboard().sms_key;
                SendSMSService.init(736300202, sendData.key_word+" "+ sendData.nick+" "+message);
            } else {
                //todo doresit vyherni sms
                alert("vyherni sms");
            }
            $scope.data.message = "";
            //console.log(sendData);
        }


        //pred nactenim kontroleru se zavola takhle funkce a overi se zda je vybranej nejaky PB
        $scope.$on("$ionicView.beforeEnter", function () {
            console.log("jsem tu");
            console.log(localStorage.getItem('user'));
            if (localStorage.getItem('user') === "login") {
                $state.go('app.login');
            }else{
                $scope.userFactory =  JSON.parse(localStorage.getItem('user'));
                $scope.loadMore();
            }
            //if (!UserFactory.isLoggedIn()) {
            //    $state.go('app.login');
            //}else if($scope.setting.getPartyboard().id_partyboard === false){
            //    console.log("presmerovavam na settings");
            //    $scope.userFactory = JSON.parse(localStorage.getItem('user'));
            //    $state.go('app.setting'); //, {}, {reload: false}
            //}else{
            //    $scope.loadMore();
            //}
        });

        /**
         * St�hne nejnov�j�� zpravy
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
         * Stahne historick� zpr�vy
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
         * Notifikace s v�berem tlacitek
         * @param msg
         */
        $scope.administration = function(msg){
            //console.log(msg);
           // console.log(UserFactory.getPermissions().admin);
            objMessage = msg;
            $ionicLoading.show({
                template: '<div >'+
                    '<button style="margin-right: 2ch" class="button button-energized" ng-click="setBan()">BAN</button>' +
                    '<button class="button button-assertive" ng-click="delMessage()">DEL</button>'+
                    '<br>'+
                    '<button class="button button-stable loadingClose" ng-click="hide()">Cancel</button>'+
                '</div>',
                scope: $scope
            });
        };

        $scope.setBan = function(){
            var response = BanService.setBan(objMessage);
            console.log(response); //todo overit azbude namapovana tabulka users a banuser
        };

        /**
         * Slou�i pro odstran�n� zpr�vy
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
                }, 1500);
            });

        };

    });
