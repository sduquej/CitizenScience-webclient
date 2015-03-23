/**
 * Created by sduquej on 12/03/2015.
 */
'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:UploadController
 * @description
 * # UploadController
 * Controller of the webClientApp for file upload
 */
angular.module('webClientApp')
  .controller('UploadController', ['restAPI', '$scope', function (restAPI, $scope) {
    $scope.$watch('files', function () {
      restAPI.uploadFile($scope.files);
    });
    //var vm = this;
    //vm.files = [];
    //$scope.$watch(function () {
    //  return vm.files;
    //}, function (newVal) {
    //  restAPI.uploadFile(newVal);
    //},true);
  }]);
