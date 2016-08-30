(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('VoiceBalanceAccessService', VoiceBalanceAccessService);

  VoiceBalanceAccessService.$inject = ['$resource'];

  function VoiceBalanceAccessService($resource) {
    return $resource('http://127.0.0.1:5000/api/voice_balance/:balance_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
