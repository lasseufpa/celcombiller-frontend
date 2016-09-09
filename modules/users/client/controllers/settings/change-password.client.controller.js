(function() {
  'use strict';

  angular
    .module('users')
    .controller('ChangePasswordController', ChangePasswordController);

  ChangePasswordController.$inject = ['$http', 'Authentication', '$mdDialog', '$q', 'MyIP' ];

  function ChangePasswordController($http, Authentication, $mdDialog, $q, MyIP) {
    var vm = this;

    vm.user = Authentication.user;
    vm.changeUserPassword = changeUserPassword;

    function changeUserPassword() {

    console.log(check(vm.current));

      if (vm.current === vm.password1) {
        vm.current = '';
        vm.password1 = '';
        vm.password2 = '';
        alertEqual();
        return;
      }


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
  }
}());