(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('ScheduleUserAccessService', ScheduleUserAccessService);

  ScheduleUserAccessService.$inject = ['$resource','MyIP'];

  function ScheduleUserAccessService($resource,MyIP) {
    return $resource('http://'+MyIP+':5000/api/schedule_user/', {}, {
      'query': {
        method: 'GET',
        params: { user_id: 2, schedule_id: 1 },
        isArray: false
      }
    });
  }
}());
