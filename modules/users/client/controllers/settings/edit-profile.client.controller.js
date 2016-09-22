(function() {
  'use strict';

  angular
    .module('users')
    .controller('EditProfileController', EditProfileController);

  EditProfileController.$inject = ['Authentication', 'UserAccessService', '$resource', 'MyIP'];

  function EditProfileController(Authentication, UserAccessService, $resource, MyIP) {
    var vm = this;

    vm.user = Authentication.user;

    var acess = $resource('http://' + MyIP + ':5000/api/users/:user_id', {
      user_id: '@id'
    });
    vm.test = 'test';

    var out = acess.get({
      id: vm.user.id
    }, function(data) {
      vm.test = data;
    });

  }
}());
