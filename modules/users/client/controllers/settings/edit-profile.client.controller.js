(function () {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['Authentication'];

  function EditProfileController(Authentication) {
    var vm = this;

    vm.user = Authentication.user;

  }
}());
