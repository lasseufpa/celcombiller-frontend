(function() {
  'use strict';

  angular
    .module('celcombiller.basic')
    .controller('BasicController', BasicController);

  BasicController.$inject = ['UserAccessService', 'DataBalanceAccessService', 'VoiceBalanceAccessService', '$timeout', '$mdDialog'];

  function BasicController(UserAccessService, DataBalanceAccessService, VoiceBalanceAccessService, $timeout, $mdDialog) {

    var vm = this;

    vm.title = "Basic0";
    vm.vvoice = 60;
    vm.vfilter = "";
    vm.array = null;
    vm.increaseVoice = increaseVoice;
    vm.increaseData = increaseData;
    vm.filter = filter;
    vm.selected = [];


    vm.promise = UserAccessService.query(function(data) {
      vm.array = vm.filteredItems = data.objects;
    }).$promise;


    function increaseVoice(_id) {
      var balance = new VoiceBalanceAccessService();
      balance.from_user_id = _id;
      balance.value = vm.vvoice * 60;
      balance.origin = "web";

      balance.$save(function(resp, headers) {
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

    function increaseData(_id) {
      var balance = new DataBalanceAccessService();
      balance.user_id = _id;
      balance.value = vm.vfilter * 1024;
      balance.origin = "web";

      balance.$save(function(resp, headers) {
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


    function filter(item) {

      if ((String(item._id).indexOf(vm.vfilter) >= 0) ||
        (String(item.name).indexOf(vm.vfilter) >= 0) ||
        (String(item.clid).indexOf(vm.vfilter) >= 0)) {
        return 1;
      } else {
        return 0;
      }
    }



  }
}());
