/**
 * Created by sduquej on 12/03/2015.
 */
'use strict';

/**
 * @ngdoc controller
 * @name webClientApp.controller:NavbarController
 * @description
 * Controller of the active view for the navbar
 */
angular.module('webClientApp')
  .controller('NavbarController', ['$location', '$scope', function ($location, $scope) {
    /**
     * @ngdoc method
     * @name isActive
     * @propertyOf webClientApp.controller:NavbarController
     * @description
     * Checks if the given `viewLocation` is currently active. This is used
     * in the navbar to properly style as `active` the current view.
     * @param {string} viewLocation Location to check if it's currently active
     * @returns {boolean}
     *        Whether the viewLocation is currently active or not.
     */
    $scope.isActive = function(viewLocation){
      return viewLocation === $location.path();
    };
  }]);
