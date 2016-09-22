(function() {
  'use strict';

  angular
    .module('celcombiller.user')
    .controller('CreateScheduleController', CreateScheduleController);

  CreateScheduleController.$inject = ['ScheduleAccessService', '$mdDialog'];

  function CreateScheduleController(ScheduleAccessService, $mdDialog) {

    var vm = this;

    vm.title = 'Criação de plano';

    vm.kinds = { 'Voz': 1, 'Dados': 2 }; // 'Voz/Dados': 3 };

    vm.kind = 1;

    var dataunities = { 'KB': 1024, 'MB': 1024 * 1024, 'GB': 1024 * 1024 * 1024 };
    var datavalues = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
    var voiceunities = { 'Segundos': 1, 'Minutos': 60, 'Horas': 60 * 60 };
    var voicevalues = [1, 5, 10, 15, 30, 45];

    vm.unities = voiceunities;
    vm.values = voicevalues;

    vm.save = save;
    vm.clean = clean;
    vm.onChange = onChange;

    function onChange() {
      if (parseInt(vm.kind) === 1) {
        vm.unities = voiceunities;
        vm.values = voicevalues;
      } else if (parseInt(vm.kind) === 2) {
        vm.unities = dataunities;
        vm.values = datavalues;
      }
    }

    function save() {
      addSchedule(vm.name, vm.day, vm.value * vm.unity, vm.kind);
      clean();
    }

    function clean() {
      vm.name = '';
      vm.kind = 1;
      vm.day = '';
      vm.value = '';
      vm.unity = '';
      vm.description = '';
    }

    function addSchedule(name, day, value, kind) {
      var newschedule = new ScheduleAccessService();

      newschedule.name = name;
      newschedule.day = parseInt(day, 10);
      newschedule.value = parseInt(value, 10);
      newschedule.kind = parseInt(kind, 10);

      newschedule.$save(function(resp, headers) {
        alertOk();
      }, function(err) {
        alertNotOk();
      });
    }

    function alertOk(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Operação realizada com sucesso')
        .textContent('Plano criado com sucesso')
        .ariaLabel('Operação realizada com sucesso')
        .ok('OK')
        .targetEvent(ev)
      );
    }

    function alertNotOk(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Erro')
        .textContent('Um erro ocorreu ao criar o plano')
        .ariaLabel('Erro')
        .ok('OK')
        .targetEvent(ev)
      );
    }
  }
}());
