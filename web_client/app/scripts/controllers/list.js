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
    // Filter and order the contributions in the last month
    return getData().then(function () {
      var aMonthAgo = moment().subtract(1, 'month');
      vm.lastContributions = vm.contributions.filter(function(contribution){
        return contribution.timestamp && moment(contribution.timestamp).diff(aMonthAgo) > 0;
      });
      // get the list of the last 10 contributions
      vm.lastTenContributions = vm.contributions.slice(0,10);
    });

    // Get the contributions list
    function getData(){
      return restAPI.list()
        .then(function(data){
          vm.contributions = data.sort(function(c1, c2){
            // To get the records in descending order we must invert the sign on the date difference.
            return -1 * moment(c1.timestamp).diff(moment(c2.timestamp),'seconds');
          });
          return vm.contributions;
        });
    }
  }
};
