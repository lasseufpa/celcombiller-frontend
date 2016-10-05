(function() {
  'use strict';

  angular
    .module('celcombiller.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {

    menuService.addMenuItem('topbar', {
      title: 'Controle de Créditos',
      state: 'credit',
      type: 'dropdown',
      roles: ['admin', 'coll']
    });

    menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Adição Manual',
      state: 'credit.manual'
    });
    menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Criar Plano',
      state: 'credit.schedule-create'
    });
    menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Listar Planos',
      state: 'credit.schedule-list '
    });
  }
}());
