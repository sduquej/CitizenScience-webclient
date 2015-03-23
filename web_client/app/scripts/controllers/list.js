'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:StatsController
 * @description
 * # StatsController
 * Statistics Controller
 */
angular
  .module('webClientApp')
  .controller('ListController', listController)

listController.$inject = ['restAPI','formConfig'];

function listController(restAPI,formConfig) {
  var vm = this;
  vm.formConfig = formConfig;

  loadData();

  function loadData(){
    // Set the keys
    return getData().then(function () {
      // TODO: Make this something useful
      //vm.keys = Object.keys(vm.contributions[8]);
      console.log('data loaded');
    });

    // Get the contributions list
    function getData(){
      return restAPI.list()
        .then(function(data){
          vm.contributions = data;
          return vm.contributions;
        });
    }
  }
};
