(function() {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  //Configuring the Users module
  function menuConfig(menuService) {

    menuService.addMenuItem('topbar', {
      title: 'Controle de Usuários',
      state: 'historic.admin',
      roles: ['admin']
    });
  }
}());