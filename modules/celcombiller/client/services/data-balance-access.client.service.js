(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('DataBalanceAccessService', DataBalanceAccessService);

  DataBalanceAccessService.$inject = ['$resource'];

  function DataBalanceAccessService($resource) {
    return $resource('http://127.0.0.1:5000/api/data_balance/:balance_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
