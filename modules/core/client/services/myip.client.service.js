(function () {
  'use strict';

  angular
    .module('core')
    .factory('MyIP', MyIP);

  function MyIP() {
    return '200.239.93.169';
  }

}());
