(function() {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  //Configuring the Users module
  function menuConfig(menuService) {

  }
}());
