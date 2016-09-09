(function() {
  'use strict';

  angular
    .module('users.services')
    .factory('UserAccessService', UserAccessService);

  UserAccessService.$inject = ['$resource','MyIP'];

  function UserAccessService($resource,MyIP) {
    return $resource('http://'+MyIP+':5000/api/users/:user_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
