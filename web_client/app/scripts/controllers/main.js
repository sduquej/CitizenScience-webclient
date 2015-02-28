'use strict';

/**
 * @ngdoc function
 * @name webClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the webClientApp
 */
angular.module('webClientApp')
  .controller('MainController', ['API','$timeout', function (API,$timeout) {
    var keys = [],
      that = this;
    this.onSubmit = onSubmit;
    this.formData = {};
    $timeout(function () {
      console.log('here');
      keys.forEach(clearElement, this);
    });
    this.resetForm = function(form) {
      if (form) {
        form.$setPristine();
        form.$setUntouched();
      }
      keys.forEach(clearElement, this);
    };

    this.formFields = [
      {
        //the key to be used in the model values {... "username": "johndoe" ... }
        key: 'email',
        type: 'input',
        templateOptions: {
          label: 'Email',
          type: 'email',
          placeholder: 'john.doe@domain.com',
          required: true
          //description: 'Descriptive text'
        }
      },
      {
        key: 'fname',
        type: 'input',
        templateOptions: {
          type: 'input',
          label: 'Forename',
          required: true
        }
      },
      {
        key: 'lname',
        type: 'input',
        templateOptions: {
          type: 'input',
          label: 'Surname',
          required: true
        }
      },
      {
        key: 'age',
        type: 'input',
        templateOptions: {
          type: 'range',
          min: '16',
          max: '50',
          value: '18',
          label: 'Age',
          required: true
        }
      },
      {
        key: 'gender',
        type: 'select',
        //default: 0,
        templateOptions: {
          label: 'Gender',
          options: [
            { name: "Female", value: "F"},
            { name: "Male", value: "M"},
            { name: "Do not specify", value: ""}
          ]
        }
      }
        //expressionProperties: {
        //  'templateOptions.disabled': '!model.username' // disabled when username is blank
        //}
    ];
    keys = this.formFields.map(function(object){ return object['key'];});
    var clearElement = function(element, index, array){
      that.formData[element] = '';
    };

    function onSubmit() {
      console.log('form submitted:', this.formData);

      API.form({
        email: this.formData.email || '',
        first_name: this.formData.fname || '',
        last_name: this.formData.lname || '',
        age: this.formData.age || '',
        gender: this.formData.gender || ''
      }).success(function (data){
        alert("Data collected :D");
        console.log(data);
      }).error(function (error) {
        if(error.error && error.error.code == 11000){
          alert("Duplicated email");
        } else {
          alert("Oops!");
          console.log("ERROR >"+error.error);
        }
      });
    };
  }])


;
