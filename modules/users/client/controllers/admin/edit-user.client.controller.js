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
      user: $stateParams.username
    }).$promise;

    _http.then(function(res) {
      console.log(res)
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
      if(vm.name !== vm.res.name){
        fields.push('name');
        values.push(vm.name);
      }
      if(vm.address !== vm.res.address){
        fields.push('address');
        values.push(vm.address);
      }
      if (vm.editPasswod) {
        fields.push('password');
        values.push(vm.password);
      }

      if(parseInt(vm.cpf) !== vm.res.cpf){
        fields.push('cpf');
        values.push(vm.cpf);
      }
      if(vm.username !== vm.res.username){
        fields.push('username');
        values.push(vm.username);
      }
      if(vm.clid !== vm.res.clid){
        fields.push('clid');
        values.push(vm.clid);
      }
      if(vm.imsi !== vm.res.imsi){
        fields.push('imsi');
        values.push(vm.imsi);
      }



      //PatchUserService($stateParams.username, fields, values);

    }

    // This function fills the cpf field with leading zeros 
    function pad(num) {
      var s = "00000000000" + num;
      return s.substr(s.length - 11);
    }

  }
}());
