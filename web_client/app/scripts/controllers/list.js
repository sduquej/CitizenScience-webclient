'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:ListController
 * @description
 * # AboutCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('ListController', ['API','$scope', function (API,$scope) {
    console.log(API);
    var that = this;
    API.list().success(function (data, status, headers, config) {
      console.log('woo!');
      that.contributions = data;
    }).error(function (data, status, headers, config) {
      console.log('SHITE!');
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
      console.log('f');
      that.keys = Object.keys(that.contributions[0]);
    });


    console.log(this);
  }]);
