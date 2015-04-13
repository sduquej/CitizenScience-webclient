/**
 * Created by sduquej on 12/03/2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:UploadController
 * @description
 * # NavbarController
 * Controller of the active view for the navbar
 */
angular.module('webClientApp')
  .controller('NavbarController', ['$location', '$scope', function ($location, $scope) {
    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path();
    };
  }]);
