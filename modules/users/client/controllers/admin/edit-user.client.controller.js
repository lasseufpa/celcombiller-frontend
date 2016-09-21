(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('EditUserController', EditUserController);

  EditUserController.$inject = ['$stateParams', 'Authentication'];

  function EditUserController($stateParams, Authentication) {

    var vm = this;
    
  }

}());