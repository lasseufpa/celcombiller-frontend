(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('DataBalanceAccessService', DataBalanceAccessService);

  DataBalanceAccessService.$inject = ['$resource','MyIP'];

  function DataBalanceAccessService($resource,MyIP) {
    return $resource('http://'+MyIP+':5000/api/data_balance/:balance_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
