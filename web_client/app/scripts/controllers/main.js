'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('MainController', ['restAPI','formConfig', function (restAPI,formConfig) {
    var vm = this;

    vm.onSubmit = onSubmit;
    vm.formData = {};
    vm.formConfig = formConfig;
    vm.resetForm = resetForm;
    vm.loading = false;

    var clearElement = function(element){
      vm.formData[element] = undefined;
    };

    function resetForm(form) {

      Object.keys(vm.formData).forEach(clearElement);
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
    }

    function onSubmit() {
      vm.loading = true;
      console.log('form submitted:', vm.formData);
      // Add timestamp to contribution
      vm.formData.timestamp = (new Date()).toJSON();
      restAPI.form(vm.formData)
        .success(function (data) {
          console.log('contribution', data);
          alert('Thanks for you contribution!');
          resetForm(vm.form);
        }).error(function (error) {
          alert('Something unexpected happened');
          console.log('ERROR :\n'+error.error);
        }).finally(function(){
          vm.loading = false;
        });
    }
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
