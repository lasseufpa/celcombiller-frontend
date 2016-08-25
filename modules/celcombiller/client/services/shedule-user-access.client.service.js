(function() {
  'use strict';

  angular
    .module('celcombiller.services')
    .factory('ScheduleUserService', ScheduleUserService);

  ScheduleUserService.$inject = ['$resource'];

  function ScheduleUserService($resource) {
    return $resource('http://127.0.0.1:5000/api/schedule_user/:user_id/:schedule_id', {}, {
      'query': {
        // method:'GET', isArray:true
      }
    });
  }
}());
