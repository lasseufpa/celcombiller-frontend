(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['Authentication']

  function HomeController(Authentication) {
    var vm = this;
    vm.authentication = Authentication;


    vm.test1 = vm.authentication
    if (vm.authentication.user.length == 0)
      vm.name = ""
    else
      vm.name = vm.authentication.user.username
  }
}());
