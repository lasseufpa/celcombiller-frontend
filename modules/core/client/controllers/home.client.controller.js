(function() {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['Authentication'];

  function HomeController(Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    if (vm.authentication.user.length === 0)
      vm.name = '';
    else
      vm.name = vm.authentication.user.username;
  }
}());
