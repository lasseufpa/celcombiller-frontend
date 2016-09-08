(function() {
  'use strict';

  // Setting up route
  angular
    .module('celcombiller.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    // Users state routing
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'modules/celcombiller/client/views/register.client.view.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cadastro de Usuário',
          roles: ['admin']
        }
      })

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
    })
    .state('historic', {
      abstract: true,
      url: '/historic',
      templateUrl: 'modules/celcombiller/client/views/historic/historic.client.view.html'
    })

    .state('historic.user', {
      url: '/historic/user',
      templateUrl: 'modules/celcombiller/client/views/historic/historic-user.client.view.html',
      controller: 'HistoricUserController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Histórico',
        roles: ['user']
      }
    })

    .state('historic.admin', {
      url: '/historic/admin',
      templateUrl: 'modules/celcombiller/client/views/historic/historic-admin.client.view.html',
      controller: 'HistoricAdminController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Histórico de Usuários',
        roles: ['admin']
      }
    })

    .state('control', {
      abstract: true,
      url: '/settings',
      templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      data: {
        roles: ['user', 'admin']
      }
    })
    .state('control.key', {
      url: '/settings',
      templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Adição Manual de Crédito',
        roles: ['user', 'admin']
      }
    })
    .state('credit.credit', {
      url: '/settings',
      templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Adição por Agendamento',
        roles: ['user', 'admin']
      }
    })
    .state('credit.history', {
      url: '/settings',
      templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
      controller: 'SettingsController',
      controllerAs: 'vm',
      data: {
        pageTitle: 'Adição por Agendamento',
        roles: ['user', 'admin']
      }
    });
  }
}());
