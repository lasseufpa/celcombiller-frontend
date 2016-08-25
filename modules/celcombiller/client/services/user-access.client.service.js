(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('UserAccessService', UserAccessService);

  UserAccessService.$inject = ['$resource'];

  function UserAccessService($resource) {
    return $resource('http://127.0.0.1:5000/api/users/:user_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
