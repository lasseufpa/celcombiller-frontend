(function () {
  'use strict';

  // Setting up route
  angular
    .module('users.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
    .state('users', {
        abstract: true,
        url: '/user',
        templateUrl: 'modules/users/client/views/admin/users.client.view.html',
        redirectTo: 'credit.manual'
      })
      .state('users.create', {
        url: '/create',
        templateUrl: 'modules/users/client/views/admin/create.client.view.html',
        controller: 'CreateUserController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Criar Usuário',
          roles: ['admin', 'coll']
        }
      })

    getUser.$inject = ['$stateParams', 'AdminService'];

    function getUser($stateParams, AdminService) {
      return AdminService.get({
        userId: $stateParams.userId
      }).$promise;
    }
  }
}());
