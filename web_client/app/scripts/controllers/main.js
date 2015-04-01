'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('MainController', ['restAPI','formConfig','$scope', function (restAPI,formConfig,$scope) {
    var keys = [],
      vm = this;

    vm.onSubmit = onSubmit;
    vm.formData = {};
    vm.formConfig = formConfig;
    vm.resetForm = resetForm;

    var clearElement = function(element){
      vm.formData[element] = undefined;
    };

    function resetForm(form) {
      Object.keys(vm.formData).forEach(clearElement);
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    };

    function onSubmit() {
      console.log('form submitted:', vm.formData);
      // Add timestamp to contribution
      vm.formData.timestamp = (new Date()).toJSON();
      restAPI.form(vm.formData).success(function (data, status, headers, config) {
        console.log(data);
        alert("Data collected :D");
        resetForm(vm.form);
      }).error(function (error) {
        alert("Something unexpected happened");
        console.log("ERROR :\n"+error.error);
      });
    };
  }])
;
//{
//  files: this.formData.file || [],
//    email: this.formData.email || '',
//  fname: this.formData.fname || '',
//  lname: this.formData.lname || '',
//  dob: this.formData.dob ? $filter('date')(new Date(this.formData.dob), 'yyyy/MM/dd') : '',
//  age: this.formData.age || '',
//  gender: this.formData.gender || '',
//  timestamp: (new Date()).toJSON()
//}
