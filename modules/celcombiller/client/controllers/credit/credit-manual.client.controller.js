(function() {
  'use strict';

  angular
    .module('celcombiller.credit')
    .controller('CreditManualController', CreditManualController);

  CreditManualController.$inject = ['UserAccessService', 'DataBalanceAccessService', 'VoiceBalanceAccessService', '$timeout', '$mdDialog', '$mdMedia'];

  function CreditManualController(UserAccessService, DataBalanceAccessService, VoiceBalanceAccessService, $timeout, $mdDialog, $mdMedia) {

    var vm = this;

    vm.title = 'Adição Manual de Créditos';
    vm.vfilter = '';
    vm.array = null;
    vm.filter = filter;
    vm.showDialog = showDialog;
    vm.selected = [];


    vm.promise = UserAccessService.query(function(data) {
      vm.array = vm.filteredItems = data.objects;
    }).$promise;


    function filter(item) {
      if ((String(item._id).indexOf(vm.vfilter) >= 0) ||
        (String(item.name).indexOf(vm.vfilter) >= 0) ||
        (String(item.clid).indexOf(vm.vfilter) >= 0)) {
        return 1;
      } else {
        return 0;
      }
    }

    function showDialog(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
      if (vm.selected.length !== 0) {
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'modules/celcombiller/client/views/credit/manual-dialog.client.view.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: useFullScreen,
          targetEvent: ev

        }).then(function() {
          vm.promise = UserAccessService.query(function(data) {
            vm.array = vm.filteredItems = data.objects;
          }).$promise;
        }, function() {
          vm.promise = UserAccessService.query(function(data) {
            vm.array = vm.filteredItems = data.objects;
          }).$promise;
        });
      }
    }

    function DialogController($scope, $mdDialog) {
      $scope.selected = vm.selected;
      $scope.dataunities = { 'KB': 1024, 'MB': 1024 * 1024, 'GB': 1024 * 1024 * 1024 };
      $scope.datavalues = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
      $scope.voiceunities = { 'Segundos': 1, 'Minutos': 60, 'Horas': 60 * 60 };
      $scope.voicevalues = [1, 5, 10, 15, 30, 45];
      $scope.dataunit = '';
      $scope.datavalue = '';
      $scope.voiceunit = '';
      $scope.voicevalue = '';

      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.hide();
      };
      $scope.save = function() {
        var i;
        if (($scope.voiceunit !== '') && ($scope.voicevalue !== '')) {
          for (i = 0; i < vm.selected.length; i++) {
            increaseVoice(vm.selected[i], $scope.voiceunit * $scope.voicevalue);
          }
        }

        if (($scope.dataunit !== '') && ($scope.datavalue !== '')) {
          for (i = 0; i < vm.selected.length; i++) {
            increaseData(vm.selected[i], $scope.dataunit * $scope.datavalue);
          }
        }
        vm.array = [];
        $mdDialog.hide();
      };
    }

    function increaseVoice(_id, value) {
      var balance = new VoiceBalanceAccessService();
      balance.from_user_id = _id;
      balance.value = value;
      balance.origin = 'web';

      balance.$save(function(resp, headers) {

      }, function(err) {

      });
    }

    function increaseData(_id, value) {
      var balance = new DataBalanceAccessService();
      balance.user_id = _id;
      balance.value = value;
      balance.origin = 'web';

      balance.$save(function(resp, headers) {

      }, function(err) {

      });
    }
  }
}());
