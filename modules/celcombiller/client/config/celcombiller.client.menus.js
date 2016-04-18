(function () {
  'use strict';

  angular
    .module('celcombiller')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Cadastrar',
      state: 'register',
    });

    menuService.addMenuItem('topbar', {
      title: 'Controle de Créditos',
      state: 'credit',
      type: 'dropdown'
    });

    menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Adição Manual',
      state: 'credit.manual'
    });
  menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Adição por Agendamento',
      state: 'credit.schedule '
    });

    menuService.addMenuItem('topbar', {
      title: 'Painel de Controle',
      state: 'settings',
      type: 'dropdown'
    });

    menuService.addSubMenuItem('topbar', 'settings', {
      title: 'Converter Chave em Créditos',
      state: 'settings.password'
    });
  menuService.addSubMenuItem('topbar', 'settings', {
      title: 'Créditos Disponíveis',
      state: 'settings.picture'
    });
  menuService.addSubMenuItem('topbar', 'settings', {
      title: 'Histórico de Chamadas ',
      state: 'settings.picture'
    });


  }
}());
