(function() {
  'use strict';

  angular
    .module('celcombiller')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {}
}());