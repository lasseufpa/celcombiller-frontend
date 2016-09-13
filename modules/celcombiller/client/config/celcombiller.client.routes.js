(function() {
  'use strict';

  // Setting up route
  angular
    .module('celcombiller.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // $stateProvider
    //   .state('historic', {
    //     abstract: true,
    //     url: '/historic',
    //     templateUrl: 'modules/celcombiller/client/views/historic/historic.client.view.html'
    //   })
    //   
    // .state('historic.user', {
    //   url: '/historic/user',
    //   templateUrl: 'modules/celcombiller/client/views/historic/historic-user.client.view.html',
    //   controller: 'HistoricUserController',
    //   controllerAs: 'vm',
    //   data: {
    //     pageTitle: 'Histórico',
    //     roles: ['user']
    //   }
    // })
    // 
    // .state('historic.admin', {
    //   url: '/historic/admin',
    //   templateUrl: 'modules/celcombiller/client/views/historic/historic-admin.client.view.html',
    //   controller: 'HistoricAdminController',
    //   controllerAs: 'vm',
    //   data: {
    //     pageTitle: 'Histórico de Usuários',
    //     roles: ['admin']
    //   }
    // })
    // 
    // .state('control', {
    //     abstract: true,
    //     url: '/settings',
    //     templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
    //     controller: 'SettingsController',
    //     controllerAs: 'vm',
    //     data: {
    //       roles: ['user', 'admin']
    //     }
    //   })
    //   .state('control.key', {
    //     url: '/settings',
    //     templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
    //     controller: 'SettingsController',
    //     controllerAs: 'vm',
    //     data: {
    //       pageTitle: 'Adição Manual de Crédito',
    //       roles: ['user', 'admin']
    //     }
    //   })
    //   .state('credit.credit', {
    //     url: '/settings',
    //     templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
    //     controller: 'SettingsController',
    //     controllerAs: 'vm',
    //     data: {
    //       pageTitle: 'Adição por Agendamento',
    //       roles: ['user', 'admin']
    //     }
    //   })
    //   .state('credit.history', {
    //     url: '/settings',
    //     templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
    //     controller: 'SettingsController',
    //     controllerAs: 'vm',
    //     data: {
    //       pageTitle: 'Adição por Agendamento',
    //       roles: ['user', 'admin']
    //     }
    //   });
  }
}());