(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('ScheduleUserService', ScheduleUserService);

  ScheduleUserService.$inject = ['$resource'];

  function ScheduleUserService($resource) {
    return $resource('http://127.0.0.1:5000/api/schedule_user/', {}, {
      'query': {
       method:'GET', params:{user_id:2,schedule_id:1}, isArray:false
      }
    });
  }
}());
