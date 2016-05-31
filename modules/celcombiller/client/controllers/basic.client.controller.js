(function() {
  'use strict';

  angular
    .module('celcombiller.basic')
    .controller('BasicController', BasicController);

  BasicController.$inject = ['UserAccessService', 'DataBalanceAccessService', 'VoiceBalanceAccessService'];



  function BasicController(UserAccessService, DataBalanceAccessService, VoiceBalanceAccessService) {
    var vm = this;

    vm.title = "Basic0";
    vm.vvoice = 60;
    vm.vdata = 1024;

    var n = 0

    vm.promise = UserAccessService.query(function(data) {
      vm.array = data.objects;
      console.log(vm.array);
    }).$promise;




    vm.increaseVoice = function(_id) {
      var test2 = new VoiceBalanceAccessService();
      test2.from_user_id = _id;
      test2.value =  vm.vvoice * 60;
      test2.origin = "web";

      test2.$save(function(resp, headers) {
          //success callback
          vm.promise = UserAccessService.query(function(data) {
            vm.array = data.objects;

          }).$promise;
        },
        function(err) {
          UserAccessService.query(function(data) {
            vm.array = data.objects;
          });
          // error callback
          console.log(err);
        });
    }


    vm.increaseData = function(_id) {
      var test2 = new DataBalanceAccessService();
      test2.user_id = _id;
      test2.value = vm.vdata * 1024 ;
      test2.origin = "web";

      test2.$save(function(resp, headers) {
          //success callback
          vm.promise = UserAccessService.query(function(data) {
            vm.array = data.objects;

          }).$promise;
        },
        function(err) {
          UserAccessService.query(function(data) {
            vm.array = data.objects;
          });
          // error callback
          console.log(err);
        });
    }

  }
}());
