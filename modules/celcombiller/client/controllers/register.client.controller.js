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

    vm.disable = vm.isadm ;

    vm.save = save;
    vm.clean = clean;

    console.log("asd")

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
    }

    function clean() {

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


    }




  }
}());
