(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('EditUserController', EditUserController);

  EditUserController.$inject = ['$stateParams', 'UserAccessService', 'PatchUserService'];

  function EditUserController($stateParams, UserAccessService, PatchUserService) {
    var vm = this;
    vm.save = save;

    vm.title = "Editar usuário " + $stateParams.username;

    vm.levels = {
      'Usuário': 1,
      'Colaborador': 2,
      'Administrador': 0
    };

    var _http = UserAccessService.get({
      username: $stateParams.username
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
    // TODO: finish the check te variables,
    // need to pay special attention to the unique fields and 
    // need to change the back end to propagate the changes to OpenBTS
    // TODO: create some dialogs like in ChangePasswordController
    function save() {
      var fields = [];
      var values = [];
      if (vm.level !== vm.res.level) {
        fields.push('level');
        values.push(vm.level);
      }
      PatchUserService($stateParams.username, fields, values);

    }

    // This function fills the cpf field with leading zeros 
    function pad(num) {
      var s = "00000000000" + num;
      return s.substr(s.length - 11);
    }

  }
}());