(function() {
  'use strict';

  // Setting up route
  angular
    .module('celcombiller.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('credit', {
        abstract: true,
        url: '/credit',
        templateUrl: 'modules/celcombiller/client/views/credit/credit.client.view.html',
        redirectTo: 'credit.manual'
      })
      .state('credit.manual', {
        url: '/manual',
        templateUrl: 'modules/celcombiller/client/views/credit/manual.client.view.html',
        controller: 'CreditManualController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Adição Manual de Crédito',
          roles: ['admin', 'coll']
        }
      })
      .state('credit.schedule-list', {
        url: '/schedule/list',
        templateUrl: 'modules/celcombiller/client/views/credit/schedule-list.client.view.html',
        controller: 'ScheduleListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Listar Planos',
          roles: ['admin', 'coll']
        }
      })
      .state('credit.schedule-create', {
        url: '/schedule/create',
        templateUrl: 'modules/celcombiller/client/views/credit/create-schedule.client.view.html',
        controller: 'CreateScheduleController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Criar Planos',
          roles: ['admin', 'coll']
        }
      });

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
