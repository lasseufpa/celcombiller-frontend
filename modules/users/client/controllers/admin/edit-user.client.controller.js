(function() {
    'use strict';

    angular
        .module('users.admin')
        .controller('EditUserController', EditUserController);

    EditUserController.$inject = ['$stateParams', 'UserAccessService'];

    function EditUserController($stateParams, UserAccessService) {
        var vm = this;

        vm.title = "Editar usuário " + $stateParams.username;

        vm.levels = { 'Usuário': 1, 'Colaborador': 2, 'Administrador': 0 };

        var _http = UserAccessService.get({ username: $stateParams.username }).$promise;

        _http.then(function(res) {
            console.log(res)
            vm.level = res.level;
            vm.name = res.name;
            vm.cpf = pad(res.cpf, 11);
            vm.address = res.address;
            vm.username = res.username;
            vm.clid = res.clid;
            vm.imsi = res.imsi;
            vm.res = res;
        });

        function pad(num, size) {
            var s = "00000000000" + num;
            return s.substr(s.length - size);
        }

    }
}());
