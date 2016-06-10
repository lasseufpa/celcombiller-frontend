(function() {
  'use strict';

  angular
    .module('celcombiller.basic')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserAccessService'];

  function RegisterController(UserAccessService) {

    var vm = this;

    vm.isadm = false;
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


    vm.save = save;
    vm.clean = clean;

    function save() {

      console.log(vm.isadm,
        vm.name,
        vm.cpf,
        vm.address,
        vm.username,
        vm.clid,
        vm.password1,
        vm.password2,
        vm.imsi,
        vm.ki);

      addUser(vm.isadm,
        vm.name,
        vm.cpf,
        vm.address,
        vm.username,
        vm.clid,
        vm.password1,
        vm.imsi);

      vm.message = "Dados salvos com sucesso";


    }

    function clean() {

      // vm.isadm = false;
      // vm.name = "";
      // vm.cpf = "";
      // vm.address = "";
      // vm.username = "";
      // vm.clid = "";
      // vm.password1 = "";
      // vm.password2 = "";
      // vm.imsi = "";
      // vm.ki = "";

      vm.isadm = false;
      vm.name = "test2";
      vm.cpf = "99999999902";
      vm.address = "lasse";
      vm.username = "test2";
      vm.clid = "123123123";
      vm.password1 = "123";
      vm.password2 = "123";
      vm.imsi = "999999999999902";
      vm.ki = "";


      vm.message = "";
    }

    function addUser(isadm, name, cpf, address, username, clid,
      password, imsi) {

      var newuser = new UserAccessService();

      newuser.admin = isadm;
      newuser.name = name;
      newuser.cpf = parseInt(cpf);
      newuser.address = address;
      newuser.username = username;
      newuser.clid = clid;
      newuser.password = password;
      newuser.imsi = parseInt(imsi);

      newuser.voice_balance = 0;
      newuser.data_balance = 0;

      console.log(newuser);

      newuser.$save(function(resp, headers) {
        console.log(res)
          //success callback
          // vm.promise = UserAccessService.query(function(data) {
          //   vm.array = data.objects;

          // }).$promise;
        },
        function(err) {
          console.log(err)
          // UserAccessService.query(function(data) {
          //   vm.array = data.objects;

          // });
          // // error callback
          // console.log(err);
        }
      );
    }




  }
}());
