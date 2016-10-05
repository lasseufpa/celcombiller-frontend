(function() {
  'use strict';

  angular
    .module('users')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['Authentication', 'UserAccessService'];

  function ProfileController(Authentication, UserAccessService) {
    var vm = this;

    var levels = [
      'Administrador',
      'Usuário',
      'Colaborador'
    ];

    UserAccessService.get({
        user: Authentication.user.username
   }).$promise
    .then(res => {
     vm.level = levels[res.level]
     vm.name = res.name;
     vm.cpf = cpfFormat(res.cpf);
     vm.address = res.address;
     vm.username = res.username;
     vm.clid = res.clid;
     vm.imsi = res.imsi;
     vm.voiceBalance = res.voice_balance;
     vm.dataBalance = res.data_balance;
   });

   function cpfFormat(num){
    var s = '00000000000' + num;
    var cpf = s.substr(s.length - 11);
    return cpf.substr(0,3)+'.'+cpf.substr(3,3)+'.'+cpf.substr(6,3)+'-'+cpf.substr(9,2)
   }
  }
}());
