(function() {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addSubMenuItem('topbar', 'admin', {
      title: 'Controle de Usuários',
      state: 'admin.users'
    });


    menuService.addMenuItem('topbar', {
      title: 'Controle de Usuários',
      state: 'historic.admin',
      roles: ['admin']
    });

  }
}());