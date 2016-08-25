(function() {
  'use strict';

  // Users directive used to check if the value is avaliable
  //TODO: It is returning the entire object, it can be dangerous.

  angular
    .module('celcombiller.credit')
    .directive('checkAvailableValidator', checkAvailableValidator);

  checkAvailableValidator.$inject = ['$http', '$q'];

  function checkAvailableValidator($http, $q) {
    
    var directive = {
      require: 'ngModel',
      link: link

    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      // ngModel.$validators.available = function(){return false};

      ngModel.$asyncValidators.notavaliable = check;

      function check(value) {
        var atribute = attrs.checkAvailableValidator;
        var filters = [{ 'name': atribute, 'op': 'eq', 'val': value }];
        var json = JSON.stringify({ 'filters': filters })
        var _http = $http.jsonp('http://127.0.0.1:5000/api/users?callback=JSON_CALLBACK', {
          params: {
            'q': json
          }

        }).then(function success(data) {
          if (data.data.data.objects.length == 0) {
            // return data.data.data.objects[0]
            return $q.defer();
          } else {;
            return $q.reject();
          }
          //return data.data.data;
        }, function error(data) {
          //TODO: handle the error
          return $q.reject();
        })
        return _http;
      };
    };
  }
}());
