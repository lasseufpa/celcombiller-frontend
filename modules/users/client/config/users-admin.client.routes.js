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
        url: '/users',
        templateUrl: 'modules/users/client/views/admin/users.client.view.html',
        redirectTo: 'credit.manual'
      })
      .state('users.create', {
        url: '/create',
        templateUrl: 'modules/users/client/views/admin/create-user.client.view.html',
        controller: 'CreateUserController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Criar Usuário',
          roles: ['admin', 'coll']
        }
      })
      .state('users.edit', {
        url: '/edit/:username',
        templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'EditUserController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Editar Usuário',
          roles: ['admin', 'coll']
        }
      })
      .state('users.list', {
        url: '/list',
        templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Listar Usuários',
          roles: ['admin']
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
