(function() {
  'use strict';

  angular
    .module('celcombiller.credit')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserAccessService'];

  function RegisterController(UserAccessService) {

    var vm = this;

    vm.level = '';
    vm.name = '';
    vm.cpf = '';
    vm.address = '';
    vm.username = '';
    vm.clid = '';
    vm.password1 = '';
    vm.password2 = '';
    vm.imsi = '';
    vm.ki = '';

    vm.message = '';

    vm.levels = { 'Usuário': 1, 'Colaborador': 2, 'Administrador': 0 };

    vm.save = save;
    vm.clean = clean;

    function save() {

      addUser(vm.level,
        vm.name,
        vm.cpf,
        vm.address,
        vm.username,
        vm.clid,
        vm.password1,
        vm.imsi);

      clean();
      vm.message = 'Dados salvos com sucesso';
    }

    function clean() {

      vm.level = '';
      vm.name = '';
      vm.cpf = '';
      vm.address = '';
      vm.username = '';
      vm.clid = '';
      vm.password1 = '';
      vm.password2 = '';
      vm.imsi = '';
      vm.ki = '';

      vm.message = '';
    }

    function addUser(level, name, cpf, address, username, clid,
      password, imsi) {

      var newuser = new UserAccessService();

      newuser.level = level;
      newuser.name = name;
      newuser.cpf = parseInt(cpf, 10);
      newuser.address = address;
      newuser.username = username;
      newuser.clid = clid;
      newuser.password = password;
      newuser.imsi = parseInt(imsi, 10);

      newuser.voice_balance = 0;
      newuser.data_balance = 0;

      newuser.$save(function(resp, headers) {

      }, function(err) {
        vm.message = 'Um erro ocorreu';
      });
    }
  }
}());
