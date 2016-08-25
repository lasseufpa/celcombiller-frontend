(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('ScheduleAccessService', ScheduleAccessService);

  ScheduleAccessService.$inject = ['$resource'];

  function ScheduleAccessService($resource) {
    return $resource('http://127.0.0.1:5000/api/schedule/:schedule_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
