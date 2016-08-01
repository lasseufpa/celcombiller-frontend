(function() {
  'use strict';

  angular
    .module('celcombiller.basic')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserAccessService'];

  function RegisterController(UserAccessService) {

    var vm = this;

    vm.level = "";
    vm.name = "";
    vm.cpf = "";
    vm.address = "";
    vm.username = "";
    vm.clid = "";
    vm.password1 = "";
    vm.password2 = "";
    vm.imsi = "";
    vm.ki = "";

    vm.message = "";

    vm.levels = {"Usuário" : 1, "Colaborador" : 2, "Administrador" : 0}

    vm.save = save;
    vm.clean = clean;

    function save() {

      // console.log(vm.level,
      //   vm.name,
      //   vm.cpf,
      //   vm.address,
      //   vm.username,
      //   vm.clid,
      //   vm.password1,
      //   vm.password2,
      //   vm.imsi,
      //   vm.ki);

      addUser(vm.level,
        vm.name,
        vm.cpf,
        vm.address,
        vm.username,
        vm.clid,
        vm.password1,
        vm.imsi);

      
      clean()
      vm.message = "Dados salvos com sucesso";

    }

    function clean() {

      vm.level = "";
      vm.name = "";
      vm.cpf = "";
      vm.address = "";
      vm.username = "";
      vm.clid = "";
      vm.password1 = "";
      vm.password2 = "";
      vm.imsi = "";
      vm.ki = "";

      // vm.level = "";
      // vm.name = "test2";
      // vm.cpf = "99999999902";
      // vm.address = "lasse";
      // vm.username = "test2";
      // vm.clid = "123123123";
      // vm.password1 = "123";
      // vm.password2 = "123";
      // vm.imsi = "999999999999902";
      // vm.ki = "";

      vm.message = "";
    }

    function addUser(level, name, cpf, address, username, clid,
      password, imsi) {

      var newuser = new UserAccessService();

      newuser.level = level;
      newuser.name = name;
      newuser.cpf = parseInt(cpf);
      newuser.address = address;
      newuser.username = username;
      newuser.clid = clid;
      newuser.password = password;
      newuser.imsi = parseInt(imsi);

      newuser.voice_balance = 0;
      newuser.data_balance = 0;

      newuser.$save(function(resp, headers) {
        //console.log(res)
          //success callback
          // vm.promise = UserAccessService.query(function(data) {
          //   vm.array = data.objects;

          // }).$promise;
        },
        function(err) {
          //console.log(err)
          // UserAccessService.query(function(data) {
          //   vm.array = data.objects;

          // });
          // // error callback
          // console.log(err);
          vm.message = "Um erro ocorreu"
        }
      );
    }
  }
}());
