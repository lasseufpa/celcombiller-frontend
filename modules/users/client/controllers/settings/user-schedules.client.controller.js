(function() {
  'use strict';

  angular
    .module('users')
    .controller('UserSchedulesController', UserSchedulesController);

  UserSchedulesController.$inject = ['$http', 'Authentication', 'MyIP'];

  function UserSchedulesController($http, Authentication, MyIP) {
    var vm = this;

    vm.promise = scheduleUser(Authentication.user.id);

    vm.promise.then(res => {
    vm.items = res.data.data.objects;
    })

    function scheduleUser(user_id) {
      // check the remaining time of a user in a schedule
      var filters = [{
        'name': 'user_id',
        'op': 'eq',
        'val': user_id
      }];
      var json = JSON.stringify({
        'filters': filters
      });
      var _http = $http.jsonp('http://' + MyIP + ':5000/api/schedule_user?callback=JSON_CALLBACK', {
        params: {
          'q': json
        }
      });
      return _http;
    }
  }

}());
