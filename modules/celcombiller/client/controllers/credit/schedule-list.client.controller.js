(function() {
  'use strict';

  angular
    .module('celcombiller.credit')
    .controller('ScheduleListController', ScheduleListController);

  ScheduleListController.$inject = ['ScheduleAccessService', 'UserAccessService', 'ScheduleUserService', '$timeout', '$mdDialog', '$mdMedia','$http','$q'];

  function ScheduleListController(ScheduleAccessService, UserAccessService, ScheduleUserService, $timeout, $mdDialog, $mdMedia,$http , $q) {
    var vm = this;

    vm.title = 'Lista de Planos';
    vm.vfilter = '';
    vm.array = null;
    vm.filter = filter;
    vm.showDialog = showDialog;
    vm.selected = [];


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

     vm.check = function(value) {

        var filters = [{ 'name': 'username', 'op': 'eq', 'val': 'guest' }];
        var json = JSON.stringify({ 'filters': filters });
        var _http = $http.jsonp('http://127.0.0.1:5000/api/users?callback=JSON_CALLBACK', {
          params: {
            'q': json
          }

        }).then(function success(data) {
          // console.log(data)
          return data;
          // return data.data.data;
        }, function error(data) {
          // TODO: handle the error
          // console.log(data)
          return data;
        });
        return _http;
      }


    vm.userInSchedule = function(ev) {
      var confirm = $mdDialog.confirm()
        .title('Usuário já esta no plano')
        .textContent('O usuário ' + vm.user.username + ' já esta no plano ' + vm.selected[0].name +
          ' com COLOCAR AQUI O TEMPO RESTANTE meses restando.\
            Deseja acrescentar ' + vm.number + ' meses ao tempo restante?')
        .ariaLabel('Usuário já esta no plano')
        .targetEvent(ev)
        .ok('OK')
        .cancel('Cancelar');

      $mdDialog.show(confirm).then(function() {
        // TODO: Verificar o tempo restaten e atualizar o valor caso ok seja pressionado
        
      }, function() {});
    };

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
      var value = "";

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
        // console.log(vm.check("guest"))

        ScheduleUserService.query({},function(data){
          console.log(data)
        })

        // console.log(crl.number)
        // console.log(crl.selectedItem._id)
        // console.log(vm.selected[0]._id)
          //$mdDialog.hide();
          //vm.showAlert()
      }

      function save() {
        if (crl.selectedItem == null) {
          crl.notvalid = true;
          // console.log(crl.selectedItem)
        } else {
          var schedule_user = new ScheduleUserService();

          schedule_user.user_id = crl.selectedItem._id;
          schedule_user.schedule_id = vm.selected[0]._id;
          schedule_user.count = crl.number;
          schedule_user.$save(function(resp, headers) {
            crl.alertOk();
            $mdDialog.hide();
          }, function(err) {
            if (err.status === 409) {
              vm.user = crl.selectedItem;
              vm.number = crl.number;
              vm.userInSchedule();
              $mdDialog.hide();
            } else {
              crl.alertNotOk();
              $mdDialog.hide();
            }
          });

        }
      }

      crl.alertOk = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Operação realizada com sucesso')
          .textContent('O usuário ' + crl.selectedItem.username + ' foi foi adicionado ao plano ' + vm.selected[0].name + ' por ' + crl.number + ' meses')
          .ariaLabel('Operação realizada com sucesso')
          .ok('OK')
          .targetEvent(ev)
        );
      };

      crl.alertNotOk = function(ev) {
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
      };
    }

  }

}());
