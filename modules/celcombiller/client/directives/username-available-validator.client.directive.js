(function() {
  'use strict';

  // Users directive used to check if the value is avaliable
  //TODO: It is returning the entire object, it can be dangerous.

  angular
    .module('celcombiller.basic')
    .directive('checkAvailableValidator', checkAvailableValidator);

  checkAvailableValidator.$inject = ['$http', '$q'];

  function checkAvailableValidator($http, $q) {
    
    var directive = {
      require: 'ngModel',
      link: link

    };

    return directive;

    function link(scope, element, attrs, ngModel) {
      ngModel.$asyncValidators.available = checkuser;

      function checkuser(value) {
        var filters = [{ "name": attrs.checkAvailableValidator, "op": "eq", "val": value }];
        var json = JSON.stringify({ "filters": filters })
        var _http = $http.jsonp('http://127.0.0.1:5000/api/users?callback=JSON_CALLBACK', {
          params: {
            "q": json
          }

        }).then(function success (data) {
            return data.data.data;
        }, function error (data) {
            return data.data.data;
        })
        console.log(_http)
        return _http;
      };
    };
  }
}());
