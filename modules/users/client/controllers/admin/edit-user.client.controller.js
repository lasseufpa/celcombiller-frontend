(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('EditUserController', EditUserController);

  EditUserController.$inject = ['$stateParams', 'UserAccessService', 'PatchUserService', '$http', 'MyIP', '$q', '$mdDialog', '$state'];

  function EditUserController($stateParams, UserAccessService, PatchUserService, $http, MyIP, $q, $mdDialog, $state) {
    var vm = this;
    vm.save = save;
    var patchUserService = PatchUserService;

    vm.title = 'Editar usuário ' + $stateParams.username;

    vm.levels = {
      'Usuário': 1,
      'Colaborador': 2,
      'Administrador': 0
    };

    var _http = UserAccessService.get({
      user: $stateParams.username
    }).$promise;

    _http.then(function(res) {
      vm.level = res.level;
      vm.name = res.name;
      vm.cpf = pad(res.cpf);
      vm.address = res.address;
      vm.username = res.username;
      vm.clid = res.clid;
      vm.imsi = res.imsi;
      vm.res = res;
    });

    // here I check the fields that were chenged then I check in the back-end
    // if the unique fields can have the new values.
    function save() {
      var fields = [];
      var values = [];
      var promises = [];
      var errors = [];
      var error = false;
      var changeUsername = false;

      if (vm.level !== vm.res.level) {
        fields.push('level');
        values.push(vm.level);
      }
      if (vm.name !== vm.res.name) {
        fields.push('name');
        values.push(vm.name);
      }
      if (vm.address !== vm.res.address) {
        fields.push('address');
        values.push(vm.address);
      }
      if (vm.editPasswod) {
        fields.push('password');
        values.push(vm.password);
      }

      if (parseInt(vm.cpf, 10) !== vm.res.cpf) {
        var cpfPromisse = checkIfInUse('cpf', vm.cpf).then(function(res) {
          if (res.data.data.num_results) {
            error = true;
            errors.push('cpf');
          } else {
            fields.push('cpf');
            values.push(vm.cpf);
          }
        });
        promises.push(cpfPromisse);
      }
      if (vm.username !== vm.res.username) {
        var usernamePromisse = checkIfInUse('username', vm.username).then(function(res) {
          if (res.data.data.num_results) {
            error = true;
            errors.push('username');
          } else {
            changeUsername = true;
            fields.push('username');
            values.push(vm.username);
          }
        });
        promises.push(usernamePromisse);
      }
      if (vm.clid !== vm.res.clid) {
        var clidPromisse = checkIfInUse('clid', vm.clid).then(function(res) {
          if (res.data.data.num_results) {
            error = true;
            errors.push('clid');
          } else {
            fields.push('clid');
            values.push(vm.clid);
          }
        });
        promises.push(clidPromisse);
      }
      if (vm.imsi !== vm.res.imsi) {
        var imsiPromisse = checkIfInUse('imsi', vm.imsi).then(function(res) {
          if (res.data.data.num_results) {
            error = true;
            errors.push('imsi');
          } else {
            fields.push('imsi');
            values.push(vm.imsi);
          }
        });
        promises.push(imsiPromisse);
      }
      $q.all(promises).then(function() {
        if (error) {
          alertEqual(errors);
        } else {
          patchUserService($stateParams.username, fields, values).then(function success(res) {
            vm.res = res.data;
            alertOk();
            // $state.go('users.edit', {
            //   username: res.data.username
            // });
          }, function error(res) {
            // If we change the username we got an error because it is our primary key
            if (res.status === 404 && changeUsername) {
              alertOk();
              $state.go('users.edit', {
                username: vm.username
              });
            } else {
              alertError();
            }
          });
        }
      });
    }

    // This function fills the cpf field with leading zeros
    function pad(num) {
      var s = '00000000000' + num;
      return s.substr(s.length - 11);
    }

    function checkIfInUse(field, value) {
      // check if a field is in user
      var filters = [{
        'name': field,
        'op': 'eq',
        'val': value
      }];
      var json = JSON.stringify({
        'filters': filters
      });
      var _http = $http.jsonp('http://' + MyIP + ':5000/api/users?callback=JSON_CALLBACK', {
        params: {
          'q': json
        }
      });
      return _http;
    }


    function alertOk(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Dados Alterados com Sucesso')
        .textContent('Dados Alterados com Sucesso.')
        .ariaLabel('Dados Alterados com Sucesso')
        .ok('OK')
        .targetEvent(ev)
      );
    }

    function alertEqual(errors) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error')
        .textContent('O(s) campo(s) ' + errors.toString() + ' já est(a)o em uso.')
        .ariaLabel('Error')
        .ok('OK')
      );
    }

    function alertError(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error')
        .textContent('Ocorreu um erro ao alterar os campos.')
        .ariaLabel('Error')
        .ok('OK')
        .targetEvent(ev)
      );
    }

  }
}());
