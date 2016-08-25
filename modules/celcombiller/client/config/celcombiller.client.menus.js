(function () {
  'use strict';

  angular
    .module('celcombiller')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  // Configuring the Users module
  function menuConfig(menuService) {

    menuService.addMenuItem('topbar', {
      title: 'Cadastrar Novo Usuário',
      state: 'register',
    });

    menuService.addMenuItem('topbar', {
      title: 'Controle de Créditos',
      state: 'credit',
      type: 'dropdown'
    });


    menuService.addMenuItem('topbar', {
      title: 'Histórico de Usuários',
      state: 'adm-historic'
    });

    menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Adição Manual',
      state: 'credit.manual'
    });
    menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Listar Planos',
      state: 'credit.schedule-list '
    });
    menuService.addSubMenuItem('topbar', 'credit', {
      title: 'Criar Plano',
      state: 'credit.schedule-create'
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
