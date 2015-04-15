'use strict';

/**
 * @ngdoc controller
 * @name webClientApp.controller:ListController
 * @description
 * ## Controller for the list/statistics view.
 * It uses the {@link webClientApp.service:formConfig formConfig} service to
 * obtain the fields that make each contribution. The
 * {@link webClientApp.service:restAPI restAPI service} is used to fetch the
 * contributions data from the backend.
 *
 * This controller manipulates the data and exposes what is intended to be
 * shown on the List view.
 */
angular
  .module('webClientApp')
  .controller('ListController', listController);

listController.$inject = ['restAPI','formConfig'];

function listController(restAPI,formConfig) {
  var vm = this;
  /**
   * @ngdoc property
   * @name formConfig
   * @propertyOf webClientApp.controller:ListController
   * @description
   * {@link webClientApp.service:formConfig#properties_formParameters formParameters}
   * object, it's injected from the
   * {@link webClientApp.service:formConfig formConfig} service.
   */
  vm.formConfig = formConfig;

  /**
   * @ngdoc property
   * @name contributions
   * @propertyOf webClientApp.controller:ListController
   * @description
   * Array of contributions in descending order by date of contribution.
   */
  vm.contributions = [];

  /**
   * @ngdoc property
   * @name contributions
   * @propertyOf webClientApp.controller:ListController
   * @description
   * Array of contributions in the last month.
   */
  vm.lastContributions = [];

  /**
   * @ngdoc property
   * @name contributions
   * @propertyOf webClientApp.controller:ListController
   * @description
   * Array of the last ten contributions.
   */
  vm.lastTenContributions = [];

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
  }

  // Get the contributions list
  function getData(){
    return restAPI.list().then(function(data){
      vm.contributions = data.sort(function(c1, c2){
        // To get the records in descending order we must invert the sign on the date difference.
        return -1 * moment(c1.timestamp).diff(moment(c2.timestamp),'seconds');
      });
      return vm.contributions;
    });
  }
}
