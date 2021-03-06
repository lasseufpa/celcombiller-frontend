(function() {
  'use strict';

  angular
    .module('users.services')
    .factory('PatchUserService', PatchUserService);

  PatchUserService.$inject = ['MyIP', '$http'];

  function PatchUserService(MyIP, $http) {
    // change the passed field to the passed value of the user with the passed username
    return function(username, fields, values) {
      var _http = $http.patch('http://' + MyIP + ':5000/api/users/' + username, {

        'fields': fields,
        'values': values
      });

      return _http;
    };
  }
}());
