(function() {
  'use strict';

  angular
    .module('users')
    .directive('passwordVerify', passwordVerify);

  passwordVerify.$inject = ['$http', '$q', 'MyIP', 'Authentication'];
  // This directive checks if the users is entering the right password
  function passwordVerify($http, $q, MyIP, Authentication) {
    var directive = {
      require: 'ngModel',
      link: link

    };

    return directive;

    function link(scope, element, attrs, ngModel) {

      ngModel.$asyncValidators.wrongpassword = check;

      function check(value) {
        var filters = [{
          'name': 'username',
          'op': 'eq',
          'val': Authentication.user.username
        }, {
          'name': 'password',
          'op': 'eq',
          'val': value
        }];
        var json = JSON.stringify({
          'filters': filters
        });

        var _http = $http.jsonp('http://' + MyIP + ':5000/api/users?callback=JSON_CALLBACK', {
          params: {
            'q': json
          }
        }).then(
          function success(data) {
            if (data.data.data.objects.length !== 0) {
              return $q.defer();
            } else {
              return $q.reject();
            }
          },
          function error(data) {
            return $q.reject();
          });
        return _http;
      }
    }
  }
}());