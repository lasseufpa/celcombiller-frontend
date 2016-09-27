(function() {
  'use strict';

  angular
    .module('celcombiller')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {

    menuService.addMenuItem('topbar', {
      title: 'Histórico',
      state: 'historic',
      type: 'dropdown',
      roles: ['user']
    });
    menuService.addSubMenuItem('topbar', 'historic', {
      title: 'Histórico de Voz',
      state: 'historic.voice'
    });
    // menuService.addSubMenuItem('topbar', 'historic', {
    //   title: 'Histórico de Dados',
    //   state: 'historic.data'
    // });
  }
}());
