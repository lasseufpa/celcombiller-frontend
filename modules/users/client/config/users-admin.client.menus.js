(function() {
  'use strict';

  angular
    .module('users.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {

    menuService.addMenuItem('topbar', {
      title: 'Controle de Usuários',
      state: 'users',
      type: 'dropdown',
      roles: ['admin']
    });

    menuService.addSubMenuItem('topbar', 'users', {
      title: 'Criar Usuário',
      state: 'users.create'
    });
  }
}());
