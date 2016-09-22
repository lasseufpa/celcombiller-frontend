(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('VoiceBalanceAccessService', VoiceBalanceAccessService);

  VoiceBalanceAccessService.$inject = ['$resource', 'MyIP'];

  function VoiceBalanceAccessService($resource, MyIP) {
    return $resource('http://' + MyIP + ':5000/api/voice_balance/:balance_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
