(function () {
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
        url: '/settings',
        templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Cadastro de Usuário',
          roles: ['user', 'admin']
        }
      })
      .state('credit', {
        abstract: true,
        url: '/settings',
        templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('credit.manual', {
        url: '/settings',
        templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Adição Manual de Crédito',
          roles: ['user', 'admin']
        }
      })
      .state('credit.schedule', {
        url: '/settings',
        templateUrl: 'modules/celcombiller/client/views/settings/settings.client.view.html',
        controller: 'SettingsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Adição por Agendamento',
          roles: ['user', 'admin']
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
      })
      .state('basic', {
        url: '/basic',
        templateUrl: 'modules/celcombiller/client/views/basic.client.view.html',
        controller: 'BasicController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Basic',

        }
      })

;
/*
      .state('celcombiller.settings.profile', {
        url: '/profile',
        templateUrl: 'modules/celcombiller/client/views/settings/edit-profile.client.view.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings'
        }
      })
      .state('celcombiller.settings.password', {
        url: '/password',
        templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
        controller: 'ChangePasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings password'
        }
      })
      .state('celcombiller.settings.accounts', {
        url: '/accounts',
        templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
        controller: 'SocialAccountsController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings accounts'
        }
      })
      .state('celcombiller.settings.picture', {
        url: '/picture',
        templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html',
        controller: 'ChangeProfilePictureController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Settings picture'
        }
      })
      .state('celcombiller.authentication', {
        abstract: true,
        url: '/authentication',
        templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm'
      })
      .state('celcombiller.authentication.signup', {
        url: '/signup',
        templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signup'
        }
      })
      .state('celcombiller.authentication.signin', {
        url: '/signin?err',
        templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
        controller: 'AuthenticationController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('celcombiller.password', {
        abstract: true,
        url: '/password',
        template: '<ui-view/>'
      })
      .state('celcombiller.password.forgot', {
        url: '/forgot',
        templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password forgot'
        }
      })
      .state('celcombiller.password.reset', {
        abstract: true,
        url: '/reset',
        template: '<ui-view/>'
      })
      .state('celcombiller.password.reset.invalid', {
        url: '/invalid',
        templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
        data: {
          pageTitle: 'Password reset invalid'
        }
      })
      .state('celcombiller.password.reset.success', {
        url: '/success',
        templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
        data: {
          pageTitle: 'Password reset success'
        }
      })
      .state('celcombiller.password.reset.form', {
        url: '/:token',
        templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
        controller: 'PasswordController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Password reset form'
        }
      });
      */
  }
}());
