(function() {
  'use strict';

  angular
    .module('celcombiller.credit')
    .controller('ScheduleListController', ScheduleListController);

  ScheduleListController.$inject = ['ScheduleAccessService', 'UserAccessService', 'ScheduleUserAccessService', '$timeout', '$mdDialog', '$mdMedia', '$http', '$q', 'MyIP'];

  function ScheduleListController(ScheduleAccessService, UserAccessService, ScheduleUserAccessService, $timeout, $mdDialog, $mdMedia, $http, $q, MyIP) {
    var vm = this;

    vm.title = 'Lista de Planos';
    vm.vfilter = '';
    vm.array = null;
    vm.filter = filter;
    vm.selected = [];

    vm.showDialog = showDialog;
    vm.checkRemainTime = checkRemainTime;
    vm.userInSchedule = userInSchedule;
    vm.patchUserSchedule = patchUserSchedule;
    vm.alertOk = alertOk;
    vm.alertNotOk = alertNotOk;

    vm.promise = ScheduleAccessService.query(function(data) {
      vm.array = vm.filteredItems = data.objects;
    }).$promise;

    function filter(item) {
      if ((String(item._id).indexOf(vm.vfilter) >= 0) ||
        (String(item.name).indexOf(vm.vfilter) >= 0) ||
        (String(item.day).indexOf(vm.vfilter) >= 0)) {
        return 1;
      } else {
        return 0;
      }
    }

    function checkRemainTime(user_id, schedule_id) {
      // check the remaining time of a user in a schedule
      var filters = [{
        'name': 'schedule_id',
        'op': 'eq',
        'val': schedule_id
      }, {
        'name': 'user_id',
        'op': 'eq',
        'val': user_id
      }];
      var json = JSON.stringify({
        'filters': filters
      });
      var _http = $http.jsonp('http://' + MyIP + ':5000/api/schedule_user?callback=JSON_CALLBACK', {
        params: {
          'q': json
        }

      });
      return _http;
    }

    // dialog in case the user is alread in the selected schedule
    function userInSchedule(ev) {
      var confirm = $mdDialog.confirm()
        .title('Usuário já esta no plano')
        .textContent('O usuário ' + vm.user.username + ' já esta no plano ' + vm.selected[0].name +
          ' com ' + vm.count + ' meses restando.' + '\n' +
          'Deseja acrescentar ' + vm.number + ' meses ao tempo restante?')
        .ariaLabel('Usuário já esta no plano')
        .targetEvent(ev)
        .ok('OK')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function() {
        // if the user press ok increase the remaing time
        vm.patchUserSchedule(vm.selected[0]._id, vm.user._id, vm.number + vm.count);
      }, function() {});
    }

    function patchUserSchedule(schedule_id, user_id, number) {
      var filters = [{
        'name': 'schedule_id',
        'op': 'eq',
        'val': schedule_id
      }, {
        'name': 'user_id',
        'op': 'eq',
        'val': user_id
      }];
      var json = JSON.stringify({
        'filters': filters
      });
      var _http = $http.patch('http://' + MyIP + ':5000/api/schedule_user', {

        'q': {
          'filters': filters
        },
        'count': number

      });

      _http.then(
        function(resp, headers) {
          vm.alertOk();
        },
        function(err) {
          vm.alertNotOk();
        });
    }

    function alertOk(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Operação realizada com sucesso')
        .textContent('O usuário ' + vm.user.username + ' foi foi adicionado ao plano ' + vm.selected[0].name + ' por ' + (vm.number + vm.count) + ' meses')
        .ariaLabel('Operação realizada com sucesso')
        .ok('OK')
        .targetEvent(ev)
      );
    }

    function alertNotOk(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Erro')
        .textContent('Um erro ocorreu ao adicionar o usuário ao plano')
        .ariaLabel('Erro')
        .ok('OK')
        .targetEvent(ev)
      );
    }

    function showDialog(ev) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
      if (vm.selected.length !== 0) {
        $mdDialog.show({
          controller: DialogController,
          controllerAs: 'crl',
          templateUrl: 'modules/celcombiller/client/views/credit/schedule-user.client.view.html',
          parent: angular.element(document.body),
          clickOutsideToClose: true,
          fullscreen: useFullScreen,
          targetEvent: ev

        });
      }
    }

    function DialogController($timeout, $q, $scope, $mdDialog) {
      var crl = this;
      crl.array = null;
      var value = '';

      crl.searchTextChange = searchTextChange;
      crl.cancel = cancel;
      crl.save = save;

      crl.promise = UserAccessService.query(function(data) {
        crl.array = crl.filteredItems = data.objects;
      }).$promise;
      crl.notvalid = false;

      function searchTextChange(string) {
        value = string;
        crl.filteredItems = crl.array.filter(filtername);
      }

      function filtername(item) {
        if (String(item.name).startsWith(value))
          return 1;
        else
          return 0;
      }

      function cancel() {

        $mdDialog.hide();

      }

      function save() {
        if (crl.selectedItem === null) {
          crl.notvalid = true;
        } else {
          var schedule_user = new ScheduleUserAccessService();
          // try to add the user in the schedule
          schedule_user.user_id = crl.selectedItem._id;
          schedule_user.schedule_id = vm.selected[0]._id;
          schedule_user.count = crl.number;
          schedule_user.$save(function(resp, headers) {
            vm.alertOk();
            $mdDialog.hide();
          }, function(err) {
            // if the user is already in the schedule ask the user if he wants to increase the remain time
            if (err.status === 409) {
              vm.user = crl.selectedItem;
              vm.number = crl.number;
              // if the count of remaining month is zero we dont ask.
              if (vm.number === 0) {
                vm.patchUserSchedule(vm.selected[0]._id, vm.user._id, vm.number + vm.count);
              } else {
                vm.checkRemainTime(vm.user._id, vm.selected[0]._id)
                  .then(function(data) {
                    vm.count = data.data.data.objects[0].count;
                    vm.userInSchedule();
                    $mdDialog.hide();
                  });
              }
            } else {
              vm.alertNotOk();
              $mdDialog.hide();
            }
          });
        }
      }
    }
  }
}());
