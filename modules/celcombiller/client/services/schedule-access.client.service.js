(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('ScheduleAccessService', ScheduleAccessService);

  ScheduleAccessService.$inject = ['$resource','MyIP'];

  function ScheduleAccessService($resource,MyIP) {
    return $resource('http://'+MyIP+':5000/api/schedule/:schedule_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
