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
      roles: ['admin','coll']
    });

    menuService.addSubMenuItem('topbar', 'users', {
      title: 'Criar Usuário',
      state: 'users.create',
      roles: ['admin','coll']
    });
    // menuService.addSubMenuItem('topbar','users',{
    //   title: 'Editar Usuário',
    //   state: 'users.edit',
    //   roles: ['admin','coll']
    // });
    menuService.addSubMenuItem('topbar','users',{
      title: 'Listar Usuários',
      state: 'users.list',
      roles: ['admin']
    });
  }
}());
