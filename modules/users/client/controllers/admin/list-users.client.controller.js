(function() {
  'use strict';

  angular
    .module('users.admin')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['UserAccessService', '$state'];

  function UserListController(UserAccessService, $state) {
    var vm = this;
    vm.title = 'Lista de Usuários';
    vm.vfilter = '';
    vm.array = null;
    vm.filter = filter;
    vm.selected = [];
    vm.edit = edit;

    vm.promise = UserAccessService.query(function(data) {
      vm.array = vm.filteredItems = data.objects;
    }).$promise;

    function filter(item) {
      if ((String(item._id).indexOf(vm.vfilter) >= 0) ||
        (String(item.name).indexOf(vm.vfilter) >= 0) ||
        (String(item.day).indexOf(vm.vfilter) >= 0)) {
        return 1;
      } else {
        return 0;
      }
    }

    function edit() {
      console.log(vm.selected)
      $state.go('users.edit',{username: vm.selected})
    }
  }
}());
