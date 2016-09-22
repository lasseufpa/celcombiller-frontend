(function () {
  'use strict';

  angular
    .module('core')
    .factory('MyIP', MyIP);

  function MyIP() {
    return 'localhost';
  }

}());
