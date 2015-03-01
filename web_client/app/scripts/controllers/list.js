'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:ListController
 * @description
 * # AboutCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('ListController', ['restAPI','formConfig', function (restAPI,formConfig) {
    this.formConfig = formConfig;
    var that = this;
    restAPI.list().success(function (data, status, headers, config) {
      console.log('woo! query success');
      that.contributions = data;
    }).error(function (data, status, headers, config) {
      console.log('SHITE! query fail');
      that.contributions = [
        {
          email: 'dummy Email',
          first_name: 'dummy Name',
          last_name: 'dummy LastName',
          age: '25',
          gender: 'M'
        },
        {
          email: 'dummy Email 2',
          first_name: 'dummy Name',
          last_name: 'dummy LastName',
          age: '20',
          gender: 'F'
        }
      ];
    }).finally(function(){
      that.keys = Object.keys(that.contributions[8]);
    });

  }]);
