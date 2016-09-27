(function () {
  'use strict';

  angular
    .module('core')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenu('account', {
      roles: ['user']
    });

    menuService.addMenuItem('account', {
      title: '',
      state: 'settings',
      type: 'dropdown',
      roles: ['user']
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Informações da Conta',
      state: 'settings.profile'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Planos',
      state: 'settings.schedules'
    });

    menuService.addSubMenuItem('account', 'settings', {
      title: 'Redefinir Senha',
      state: 'settings.password'
    });

    // menuService.addSubMenuItem('account', 'settings', {
    //   title: 'Manage Social Accounts',
    //   state: 'settings.accounts'
    // });
  }
}());
