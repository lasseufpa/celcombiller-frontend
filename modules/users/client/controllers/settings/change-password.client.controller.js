(function() {
  'use strict';

  angular
    .module('users')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['$http', 'Authentication', '$mdDialog', '$q', 'MyIP', 'PatchUserService'];

  function ChangePasswordController($http, Authentication, $mdDialog, $q, MyIP, PatchUserService) {
    var vm = this;

    vm.user = Authentication.user;
    vm.changeUserPassword = changeUserPassword;

    function changeUserPassword() {
      if (vm.current === vm.password1) {
        alertEqual();
        return;
      } else {
        var _http = PatchUserService(vm.user.username, ['password'], [vm.password1]);

        _http.then(function(resp, header) {
          alertOk();

        }, function(err) {
          alertError();
        });
      }
      cleanFields();
    }

    function cleanFields() {
      vm.current = '';
      vm.password1 = '';
      vm.password2 = '';
    }

    function alertEqual(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Senhas Iguais')
        .textContent('A nova senha não poder ser igual a senha antiga.')
        .ariaLabel('Senhas Iguais')
        .ok('OK')
        .targetEvent(ev)
      );
    }

    function alertOk(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Senha Alterada')
        .textContent('Sua senha foi alterada com sucesso.')
        .ariaLabel('Senha Alterada')
        .ok('OK')
        .targetEvent(ev)
      );
    }

    function alertError(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error')
        .textContent('Ocorreu um erro ao alterar a senha.')
        .ariaLabel('Error')
        .ok('OK')
        .targetEvent(ev)
      );
    }
  }
}());
