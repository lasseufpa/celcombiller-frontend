(function() {
  'use strict';

  // Setting up route
  angular
    .module('celcombiller.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('historic', {
      abstract: true,
      url: '/historic',
      templateUrl: 'modules/celcombiller/client/views/historic/historic.client.view.html',
      redirectTo: 'historic.voice'
    })
    .state('historic.voice', {
      url: '/voice',
      templateUrl: 'modules/celcombiller/client/views/historic/voice.client.view.html',
      controller: 'HistoricVoiceController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Histórico de Voz',
        roles: ['user']
      }
    })
    .state('historic.data', {
      url: '/data',
      templateUrl: 'modules/celcombiller/client/views/historic/data.client.view.html',
      controller: 'HistoricDataController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Histórico de Dado',
        roles: ['user']
      }
    });
  }
}());
