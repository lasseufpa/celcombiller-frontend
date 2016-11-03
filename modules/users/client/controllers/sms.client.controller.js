(function() {
  'use strict';

  angular
    .module('users')
    .controller('SmsController', SmsController);

  SmsController.$inject = ['$http', '$mdDialog', 'MyIP', 'Authentication'];

  function SmsController($http, $mdDialog, MyIP, Authentication) {
    var vm = this;

    vm.title = 'Enviar SMS';
    vm.id = Authentication.user.id;
    vm.clean = clean;
    vm.send = send;

    function clean() {
      vm.to = '';
      vm.msg = '';
    }

    function send() {
      console.log('send');
      $http.post('http://' + MyIP + ':5000/sms', {
        'id': vm.id,
        'to': vm.to,
        'msg': vm.msg
      }).success(function(response) {
        alertOk();

      }).error(function(response,code) {
          if(code === 404){
            alertInvalid();
          }else{
            alertError();
          }
      });
    }

    function alertOk(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Operação realizada com sucesso')
        .textContent('Mensagem enviada')
        .ariaLabel('Operação realizada com sucesso')
        .ok('OK')
        .targetEvent(ev)
      );
    }
    function alertInvalid(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error')
        .textContent('Número invalido.')
        .ariaLabel('Error')
        .ok('OK')
        .targetEvent(ev)
      );
    }
    function alertError(ev) {
      $mdDialog.show(
        $mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('Error')
        .textContent('Ocorreu um erro ao envia a SMS.')
        .ariaLabel('Error')
        .ok('OK')
        .targetEvent(ev)
      );
    }
  }
}());
