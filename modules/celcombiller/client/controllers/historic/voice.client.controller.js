(function() {
  'use strict';

  angular
    .module('celcombiller.historic')
    .config(function($mdDateLocaleProvider) {
      $mdDateLocaleProvider.formatDate = function(date) {
        return moment(date).format('DD/MM/YYYY');
      };
      $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
      };
    })
    .controller('HistoricVoiceController', HistoricVoiceController);

  HistoricVoiceController.$inject = ['Authentication', '$http', 'MyIP'];

  function HistoricVoiceController(Authentication, $http, MyIP) {
    var vm = this;
    vm.title = 'Histórico de Voz'
    vm.userId = Authentication.user.id;

    vm.historic = [];
    vm.options = {'Chamadas e Recargas' : 0 , 'Chamadas' : 1 ,'Recargas': 2}
    vm.selected = 0;
    
    vm.dateEnd = new Date();
    vm.dateBegin = new Date();
    vm.today = new Date();

    vm.dateBegin.setMonth(vm.dateBegin.getMonth() - 1)
    
    vm.refreshList = refreshList;
    
    vm.promise = createList();

    vm.promise.then(res => {
      console.log(res.data.data)
      vm.historic = res.data.data.objects;
    })
    
    
    function refreshList(){
      vm.promise = createList();

      vm.promise.then(res => {
        console.log(res.data.data)
        vm.historic = res.data.data.objects;
      })
    }

    function createList() {
      // check the remaining time of a user in a schedule
      var filters = [{
        'name': 'from_user_id',
        'op': '==',
        'val': vm.userId
      }, {
        'name': 'date',
        'op': '>',
        'val': vm.dateBegin
      }, {
        'name': 'date',
        'op': '<',
        'val': vm.dateEnd
      }];
      var json = JSON.stringify({
        'filters': filters
      });
      var _http = $http.jsonp('http://' + MyIP + ':5000/api/voice_balance?callback=JSON_CALLBACK', {
        params: {
          'q': json
        }
      });
      return _http;
    }


  }
}());
